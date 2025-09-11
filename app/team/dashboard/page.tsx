"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

export default function TeamDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [teams, setTeams] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);

  // Check login token
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
      if (!newToken) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/"); // redirect to login if not logged in
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  // Fetch top teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/team/topteams", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const sortedTeams = res.data
          .sort((a: any, b: any) => b.totalScore - a.totalScore)
          .slice(0, 5);
        setTeams(sortedTeams);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };

    const fetchNotices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/team/view/notices", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setNotices(res.data.notices);
      } catch (err) {
        console.error("Error fetching notices:", err);
      }
    };

    fetchTeams();
    fetchNotices();
  }, []);

  // Navigate to team detail page
  const viewTeam = (teamName: string) => {
    router.push(`/team/${teamName}`);
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-gray-950 text-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 p-6 flex flex-col border-r border-gray-800">
          <h2 className="text-xl font-bold mb-8">Team Dashboard</h2>
          <nav className="flex flex-col gap-4">
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => router.push("/team/dashboard")}
            >
              📊 Top Teams
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => router.push("/team/team_info")}
            >
              👥 My Team
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Notices Section */}
          {notices.length > 0 && (
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4">📢 Important Notices</h1>
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div
                    key={notice._id}
                    className="p-4 bg-gray-800 border border-gray-700 rounded-xl shadow"
                  >
                    <h3 className="text-lg font-bold text-yellow-400">{notice.title}</h3>
                    <p className="text-gray-100 mt-1">{notice.message}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      🗓 {new Date(notice.startDate).toLocaleDateString()} -{" "}
                      {new Date(notice.endDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard */}
          <header className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">🏆 Top 5 Teams</h1>
          </header>

          <div className="bg-gray-900 rounded-xl shadow-md border border-gray-800">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold">Leaderboard</h2>
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
                      <tr key={team._id} className="hover:bg-gray-800/50 cursor-pointer" onClick={() => viewTeam(team.teamName)}>
                        <td className="px-4 py-2 border-b border-gray-800">{index + 1}</td>
                        <td className="px-4 py-2 border-b border-gray-800">{team.teamName}</td>
                        <td className="px-4 py-2 border-b border-gray-800 text-right">{team.totalScore}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-6 text-center text-gray-400">
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
