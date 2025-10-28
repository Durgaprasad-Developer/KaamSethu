"use client";

import { useRef, useEffect } from "react";
import { Mic } from 'lucide-react';

export default function OtpInput() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInput = (index: number, e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input.value;

    // Only allow single digit
    if (value.length > 1) {
      input.value = value[0];
    }

    // Move to next input if value entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Enable/disable submit button based on all inputs filled
    updateSubmitButton();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    // Only process if it's 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      pastedData.split("").forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = char;
        }
      });
      // Focus last input
      inputRefs.current[5]?.focus();
      updateSubmitButton();
    }
  };

  const updateSubmitButton = () => {
    // Check if all inputs are filled
    const allFilled = inputRefs.current.every((input) => input?.value.length === 1);
    const submitButton = document.getElementById("verify-button") as HTMLButtonElement;
    const hiddenInput = document.getElementById("token-hidden") as HTMLInputElement;
    
    if (submitButton) {
      submitButton.disabled = !allFilled;
      if (allFilled) {
        submitButton.dataset.enabled = "true";
        // Combine all values into hidden input
        if (hiddenInput) {
          hiddenInput.value = inputRefs.current.map((input) => input?.value || "").join("");
        }
      } else {
        submitButton.dataset.enabled = "false";
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 pt-2">
      <div className="flex items-center gap-4">
        <fieldset className="relative flex gap-2 sm:gap-3">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="otp-input flex h-14 w-11 sm:w-12 text-center text-xl font-bold [appearance:textfield] focus:outline-none rounded-lg border border-[#D1D5DB] dark:border-[#4B5563] bg-transparent focus:ring-0 text-[#1F2937] dark:text-[#F9FAFB] focus:border-[#3B82F6] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.3)]"
              inputMode="numeric"
              maxLength={1}
              pattern="[0-9]*"
              type="text"
              onInput={(e) => handleInput(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
            />
          ))}
        </fieldset>
        <button
          type="button"
          aria-label="Use voice input"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F9FAFB] dark:bg-[#101922] text-[#6B7280] dark:text-[#9CA3AF] hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors"
          onClick={() => alert("Voice input coming soon!")}
        >
          <Mic className="w-6 h-6" />
        </button>
      </div>
      {/* Hidden input to store combined OTP value for form submission */}
      <input type="hidden" name="token" id="token-hidden" />
    </div>
  );
}
