"use client"

import { LoginForm } from "@/components/login-form"
import AboutUsPage from "@/components/aboutus"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[#0a0a0a] overflow-hidden">
      
      {/* neon cyberpunk grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(0deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* content wrapper */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl">
        
        {/* login card */}
      

        {/* about us card */}
        <div className="w-full max-w-3xl">
          <div className="rounded-2xl bg-[#1a1a1a]/70 backdrop-blur-md p-8 shadow-[0_0_25px_rgba(6,182,212,0.5)] border border-[#a855f7]/40">
            <AboutUsPage />
          </div>
        </div>

          <div className="w-full max-w-md flex-shrink-0">
          <div className="rounded-2xl bg-[#1a1a1a]/80 backdrop-blur-md p-8 shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-[#06b6d4]/40">
            <h1 className="text-center text-3xl font-extrabold mb-6 bg-gradient-to-r from-[#a855f7] via-[#06b6d4] to-[#84cc16] bg-clip-text text-transparent">
              Welcome to Algomania
            </h1>
            <LoginForm />
          </div>
        </div>

      </div>
    </div>
  )
}
