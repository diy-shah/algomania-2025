import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-950 overflow-hidden">
      
      {/* grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* login card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-xl bg-white/10 backdrop-blur-md p-8 shadow-2xl text-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
