"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Menu, X } from "lucide-react"

interface NavbarProps extends React.ComponentProps<"div"> {}

export function Navbar({ className, ...props }: NavbarProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    router.push("/") // redirect to login
  }

  return (
    <nav
      className={cn(
        "relative flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-800 via-blue-900 to-slate-900 text-white shadow-lg border-b border-blue-600/40",
        className
      )}
      {...props}
    >
      {/* Left: Logo + Title */}
      <div
        className="flex items-center gap-3 group cursor-pointer"
      >
        <Image
          src="/algomania_icon.png"
          alt="AlgoMania Logo"
          width={42}
          height={42}
          className="rounded-md transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3"
        />
        <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent font-sans group-hover:brightness-125 transition-all duration-300">
          AlgoMania
        </h1>
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-4">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-blue-700/60 transition rounded-lg"
            onClick={() => router.push("/about")}
          >
            About Us
          </Button>
          <Button
            variant="destructive"
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-blue-700/50 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-r from-indigo-800 via-blue-900 to-slate-900 flex flex-col items-center gap-4 py-4 md:hidden border-t border-blue-600/40 z-50">
          <Button
            variant="ghost"
            className="text-white hover:bg-blue-700/60 transition rounded-lg w-3/4"
            onClick={() => {
              router.push("/about")
              setIsOpen(false)
            }}
          >
            About Us
          </Button>
          <Button
            variant="destructive"
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg w-3/4"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  )
}
