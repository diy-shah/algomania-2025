"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const router = useRouter()

  // Navigate to a team’s dashboard (example)
  const goToTeam = (teamId: number) => {
    router.push(`/team/${teamId}`)
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 flex flex-col border-r border-gray-800">
        <h2 className="text-xl font-bold mb-8">MyApp Admin</h2>
        <nav className="flex flex-col gap-4">
          <Button variant="ghost" className="justify-start">
            📊 Dashboard
          </Button>
          <Button variant="ghost" className="justify-start">
            👥 Teams
          </Button>
         
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </header>

        {/* Teams Table */}
        <div className="bg-gray-900 rounded-xl shadow-md border border-gray-800">
          <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold">🏆 All Teams</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-700 w-12">#</th>
                  <th className="px-4 py-2 border-b border-gray-700">Team Name</th>
                  <th className="px-4 py-2 border-b border-gray-700">Members</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-right">Individual Scores</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-right">Total Score</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Team 1 */}
                <tr className="hover:bg-gray-800/50">
                  <td className="px-4 py-2 border-b border-gray-800">1</td>
                  <td className="px-4 py-2 border-b border-gray-800">Team1</td>
                  <td className="px-4 py-2 border-b border-gray-800">
                    Alice (alice123)<br />
                    Bob (bob456)<br />
                    Charlie (charlie789)
                  </td>
                  <td className="px-4 py-2 border-b border-gray-800 text-right">
                    50<br />
                    40<br />
                    60
                  </td>
                  <td className="px-4 py-2 border-b border-gray-800 text-right font-bold">150</td>
                  <td className="px-4 py-2 border-b border-gray-800 text-center">
                    <Button variant="outline" size="sm" className="text-black" onClick={() => goToTeam(1)}>View</Button>
                  </td>
                </tr>

                {/* Team 2 */}
                <tr className="hover:bg-gray-800/50">
                  <td className="px-4 py-2 border-b border-gray-800">2</td>
                  <td className="px-4 py-2 border-b border-gray-800">Team2</td>
                  <td className="px-4 py-2 border-b border-gray-800">
                    David (david111)<br />
                    Eve (eve222)<br />
                    Frank (frank333)
                  </td>
                  <td className="px-4 py-2 border-b border-gray-800 text-right">
                    30<br />
                    50<br />
                    60
                  </td>
                  <td className="px-4 py-2 border-b border-gray-800 text-right font-bold">140</td>
                  <td className="px-4 py-2 border-b border-gray-800 text-center">
                    <Button variant="outline" size="sm" className="text-black" onClick={() => goToTeam(2)}>View</Button>
                  </td>
                </tr>

                {/* Team 3 */}
                <tr className="hover:bg-gray-800/50">
                  <td className="px-4 py-2 border-b border-gray-800">3</td>
                  <td className="px-4 py-2 border-b border-gray-800">Team3</td>
                  <td className="px-4 py-2 border-b border-gray-800">
                    Grace (grace101)<br />
                    Henry (henry202)<br />
                    Ivy (ivy303)
                  </td>
                  <td className="px-4 py-2 border-b border-gray-800 text-right">
                    45<br />
                    35<br />
                    50
                  </td>
                  <td className="px-4 py-2 border-b border-gray-800 text-right font-bold">130</td>
                  <td className="px-4 py-2 border-b border-gray-800 text-center">
                    <Button variant="outline" size="sm" className="text-black" onClick={() => goToTeam(3)}>View</Button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
