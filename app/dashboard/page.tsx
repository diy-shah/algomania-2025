"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 flex flex-col border-r border-gray-800">
        <h2 className="text-xl font-bold mb-8">MyApp</h2>
        <nav className="flex flex-col gap-4">
          <Button variant="ghost" className="justify-start">
            📊 Dashboard
          </Button>
          <Button variant="ghost" className="justify-start">
            👥 Team
          </Button>
          <Button variant="ghost" className="justify-start">
            ⚙️ Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>

        {/* Cards */}
      </main>
    </div>
  )
}
