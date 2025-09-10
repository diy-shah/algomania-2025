"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavbarProps extends React.ComponentProps<"div"> {}

export function Navbar({ className, ...props }: NavbarProps) {
  const router = useRouter()

  const handleLogout = () => {
    // clear auth data
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    router.push("/") // redirect to login
  }

  return (
    <nav
      className={cn(
        "flex items-center justify-between px-6 py-4 bg-green-700 text-white  shadow-md",
        className
      )}
      {...props}
    >
      {/* Left: Title */}
      <h1 className="text-2xl font-bold tracking-wide">AlgoMania</h1>

      {/* Right: Buttons */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="bg-red-400 hover:bg-red-600"
          onClick={() => router.push("/about")}
        >
          About Us
        </Button>
        <Button
          variant="destructive"
          className="bg-red-400 hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  )
}
