// app/login/page.tsx
import { sendOtp } from "./actions";
import { Briefcase, Phone, AlertCircle, ShieldCheck } from 'lucide-react';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; message?: string }>;
}) {
  const params = await searchParams;
  const userType = params.type || "worker";

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6 rounded-2xl bg-slate-800 p-8 shadow-2xl border border-slate-700">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                {userType === "employer" ? (
                  <Briefcase className="text-white w-6 h-6" />
                ) : (
                  <ShieldCheck className="text-white w-6 h-6" />
                )}
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                KaamSetu
              </h2>
            </div>
            <h1 className="text-gray-100 text-xl font-bold mb-2">
              {userType === "employer" ? "Employer Login" : "Worker Login"}
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your phone number to receive OTP
            </p>
          </div>

          {/* Error Message */}
          {params.message && (
            <div className="px-4 py-3 rounded-xl bg-red-900/30 border border-red-700 flex items-start gap-3">
              <AlertCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 flex-1">
                {params.message}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form action={sendOtp} className="space-y-5">
            <input type="hidden" name="userType" value={userType} />
            
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-200 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone className="w-5 h-5" />
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-600 bg-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-gray-100 placeholder:text-gray-500"
                />
              </div>
              <p className="mt-2 text-xs text-gray-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Include country code (e.g., +91 for India)
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 text-base font-bold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Send OTP</span>
              <Phone className="w-5 h-5" />
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>

        {/* Switch User Type */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {userType === "worker" ? "Looking to hire?" : "Looking for work?"}{" "}
            <a 
              href={`/login?type=${userType === "worker" ? "employer" : "worker"}`}
              className="font-semibold text-blue-400 hover:text-blue-300 underline"
            >
              Switch to {userType === "worker" ? "Employer" : "Worker"} login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}