"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import GoldenButton from "@/components/ui/golden_button";
import { Toast, useToast } from "@/components/Toast";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        showToast("Invalid credentials. Please try again.", "error");
        return;
      }

      if (data.session) {
        // Store tokens in cookies for API routes
        document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=3600`;
        document.cookie = `sb-refresh-token=${data.session.refresh_token}; path=/; max-age=3600`;

        showToast("Login successful! Welcome back ✨", "success");
        setTimeout(() => router.push("/admin"), 1000);
      }
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast {...toast} onClose={hideToast} />
      <div className="min-h-screen bg-[#1a0f2e] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl leading-[1.3] font-script bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent mb-2">
              Admin Portal
            </h1>
            <p className="text-amber-100/70">Tracey&apos;s Victory Party</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-amber-500/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-amber-200 font-semibold mb-2 text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email
                </label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  required
                  className="w-full px-6 py-4 bg-white/10 border-2 border-amber-500/30 rounded-2xl text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-500/60 focus:bg-white/15 transition-all duration-300 text-lg backdrop-blur-sm"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-2 text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                  className="w-full px-6 py-4 bg-white/10 border-2 border-amber-500/30 rounded-2xl text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-500/60 focus:bg-white/15 transition-all duration-300 text-lg backdrop-blur-sm"
                  placeholder="Enter password"
                />
              </div>

              <GoldenButton
                className="w-full justify-center mt-6"
                type="submit"
              >
                {loading ? "Logging in..." : "Login"}
              </GoldenButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
