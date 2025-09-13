"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://54.204.245.101:5000"

export default function AllTeamsPage() {
  const router = useRouter()
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [problemIds, setProblemIds] = useState<string>("")

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token")
      setToken(newToken)
      if (!newToken) {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        router.push("/")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    handleStorageChange()

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [router])

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${apiUrl}/admin/all_teams`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setTeams(res.data)
      } catch (err) {
        console.error("Error fetching teams:", err)
      }
    }
    fetchTeams()
  }, [])

  const handleViewTeam = (teamName: string) => {
    router.push(`/admin/${teamName}`)
  }

  const handleUpdateScores = async (teamName: string) => {
    if (!startDate || !endDate || !problemIds) {
      alert("⚠️ Please fill Start Date, End Date, and Problem IDs")
      return
    }

    try {
      setLoading(teamName)
      
      // Convert comma-separated string to array of NUMBERS
      const problemsArray = problemIds.split(',')
        .map(id => id.trim())
        .filter(id => id !== '')
        .map(id => Number(id)) // Convert to numbers
        .filter(id => !isNaN(id)); // Remove any non-numbers

      console.log("Sending problems array (numbers):", problemsArray);

      // Use the contest endpoint
      const response = await axios.post(
        `${apiUrl}/admin/contest/${teamName}/update-score`,
        { 
          startDate, 
          endDate, 
          problems: problemsArray 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      console.log("Response:", response.data);

      alert(`✅ Scores updated for ${teamName}`)

      // Refresh after update
      const res = await axios.get(`${apiUrl}/admin/all_teams`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setTeams(res.data)
    } catch (err: any) {
      console.error("Error updating scores:", err)
      console.error("Error response:", err.response?.data);
      alert("❌ Failed to update scores: " + (err.response?.data?.message || err.message))
    } finally {
      setLoading(null)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-gray-950 text-gray-100">
        <aside className="w-64 bg-gray-900 p-6 flex flex-col border-r border-gray-800">
          <h2 className="text-xl font-bold mb-8">MyApp Admin</h2>
          <nav className="flex flex-col gap-4">
            <Button variant="ghost" className="justify-start" onClick={() => router.push("/admin")}>
              📊 Dashboard
            </Button>
            <Button variant="ghost" className="justify-start text-blue-400">
              👥 All Teams
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-green-400"
              onClick={() => router.push("/admin/addTeams")}
            >
              ➕ Add Team
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-green-400"
              onClick={() => router.push("/admin/addnotes")}
            >
              ➕ Add Notes
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">All Teams</h1>
          </header>

          <div className="mb-6 flex gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-400">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-gray-800 text-gray-100 rounded-lg px-3 py-2 border border-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-400">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-gray-800 text-gray-100 rounded-lg px-3 py-2 border border-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-400">Problem IDs (comma-separated numbers)</label>
              <input
                type="text"
                value={problemIds}
                onChange={(e) => setProblemIds(e.target.value)}
                placeholder="e.g., 1, 2, 3"
                className="bg-gray-800 text-gray-100 rounded-lg px-3 py-2 border border-gray-700 w-64"
              />
              <p className="text-xs text-gray-500 mt-1">Enter LeetCode problem numbers (e.g., 1, 2, 3)</p>
            </div>
          </div>

          {/* Teams Table */}
          <div className="bg-gray-900 rounded-xl shadow-md border border-gray-800">
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold">🏆 Registered Teams</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-700 w-12">#</th>
                    <th className="px-4 py-2 border-b border-gray-700">Team Name</th>
                    <th className="px-4 py-2 border-b border-gray-700">Team Leader</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-right">Total Score</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length > 0 ? (
                    teams.map((team, index) => (
                      <tr key={team._id} className="hover:bg-gray-800/50">
                        <td className="px-4 py-2 border-b border-gray-800">{index + 1}</td>
                        <td className="px-4 py-2 border-b border-gray-800">{team.teamName}</td>
                        <td className="px-4 py-2 border-b border-gray-800">{team.teamLeader}</td>
                        <td className="px-4 py-2 border-b border-gray-800 text-right font-bold">
                          {team.totalScore}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-800 text-center flex gap-2 justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-black"
                            onClick={() => handleViewTeam(team.teamName)}
                          >
                            View
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            disabled={loading === team.teamName}
                            onClick={() => handleUpdateScores(team.teamName)}
                          >
                            {loading === team.teamName ? "Updating..." : "Update"}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                        No teams found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}