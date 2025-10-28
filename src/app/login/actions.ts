// app/login/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function sendOtp(formData: FormData) {
    
  const phone = formData.get("phone") as string;
  const userType = formData.get("userType") as string || "worker";

  const supabase = await createClient();

  // Ensure phone is in E.164 format
  // You should add better validation here
  const { error } = await supabase.auth.signInWithOtp({
    phone: phone,
  });

  if (error) {
    console.error(error);
    return redirect(`/login?type=${userType}&message=Could not send OTP`);
  }

  // Redirect to a new page where the user can enter the OTP
  // Pass the phone number and user type as query params
  return redirect(`/verify-otp?phone=${encodeURIComponent(phone)}&type=${userType}`);
}