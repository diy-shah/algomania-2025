"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Users, Megaphone, PlusSquare, Menu, X } from "lucide-react"

interface SidebarProps {
  role: "admin" | "team"
}

export default function Sidebar({ role }: SidebarProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // Sidebar items
  const teamItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/team/dashboard" },
    { name: "My Team", icon: <Users size={20} />, path: "/team/team_info" },
  ]

  const adminItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "View All Teams", icon: <Users size={20} />, path: "/admin/allTeams" },
    { name: "Add Notices", icon: <Megaphone size={20} />, path: "/admin/addnotes" },
    { name: "Add Team", icon: <PlusSquare size={20} />, path: "/admin/addTeams" },
  ]

  const items = role === "team" ? teamItems : adminItems

  return (
    < div className="min-h-screen ">
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gray-900 p-6 border-r border-gray-800 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-64
          z-40
        `}
      >
        <h2 className="text-xl font-bold mb-8">
          {role === "team" ? "My Team" : "Admin Panel"}
        </h2>

        <nav className="flex flex-col gap-4">
          {items.map((item) => (
            <button
              key={item.name}
              className="flex items-center gap-3 text-left text-gray-300 hover:text-white transition"
              onClick={() => {
                router.push(item.path)
                setIsOpen(false) // Close on mobile after click
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
