"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
      if (!newToken) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  // Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
       const res = await axios.get(`${apiUrl}/admin/all_teams`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          } 
        }) 
        
        const sortedTeams = res.data
          .sort((a: any, b: any) => b.totalScore - a.totalScore)
          .slice(0, 5);
        setTeams(sortedTeams);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };

    fetchTeams();
  }, []);

  // Navigate to Add Team page
  const goToAddTeam = () => {
    router.push("/admin/addTeams");
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-gray-950 text-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 p-6 flex flex-col border-r border-gray-800">
          <h2 className="text-xl font-bold mb-8">MyApp Admin</h2>
          <nav className="flex flex-col gap-4">
            <Button variant="ghost" className="justify-start text-blue-400"    onClick={() => router.push("/admin")}>
              📊 Dashboard
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => router.push("/admin/allTeams")}
            >
              👥 All Teams
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-green-400"
              onClick={goToAddTeam}
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

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </header>

          {/* Top Teams Table */}
          <div className="bg-gray-900 rounded-xl shadow-md border border-gray-800">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold">🏆 Top 5 Teams</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-700 w-12">#</th>
                    <th className="px-4 py-2 border-b border-gray-700">Team Name</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-right">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length > 0 ? (
                    teams.map((team, index) => (
                      <tr key={team._id} className="hover:bg-gray-800/50">
                        <td className="px-4 py-2 border-b border-gray-800">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-800">
                          {team.teamName}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-800 text-right">
                          {team.totalScore}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-6 text-center text-gray-400"
                      >
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
  );
}
