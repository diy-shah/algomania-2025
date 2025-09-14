"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/side-navbar";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://54.204.245.101:5000";

export default function AllTeamsPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [problemIds, setProblemIds] = useState<string>("");

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
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [router]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${apiUrl}/admin/all_teams`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTeams(res.data);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };
    fetchTeams();
  }, []);

  const handleViewTeam = (teamName: string) => {
    router.push(`/admin/${teamName}`);
  };

  const handleUpdateScores = async (teamName: string) => {
    if (!startDate || !endDate || !problemIds) {
      alert("⚠️ Please fill Start Date, End Date, and Problem IDs");
      return;
    }
    try {
      setLoading(teamName);
      const problemsArray = problemIds
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id !== "")
        .map(Number)
        .filter((id) => !isNaN(id));
      await axios.post(
        `${apiUrl}/admin/contest/${teamName}/update-score`,
        { startDate, endDate, problems: problemsArray },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(`✅ Scores updated for ${teamName}`);
      // Refresh teams
      const res = await axios.get(`${apiUrl}/admin/all_teams`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTeams(res.data);
    } catch (err: any) {
      console.error("Error updating scores:", err.response?.data || err.message);
      alert("❌ Failed to update scores: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="admin" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {/* Header */}
          <section className="mb-8">
            <h1 className="text-5xl md:text-6xl font-extrabold font-mono uppercase bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-300 bg-clip-text  drop-shadow-lg leading-tight">
              🏢 All Teams
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 tracking-wide">
              Update scores and view registered teams
            </p>
          </section>

          {/* Filters */}
          <section className="mb-6 flex flex-col sm:flex-row gap-4">
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
              <label className="block mb-1 text-sm text-gray-400">Problem IDs (comma-separated)</label>
              <input
                type="text"
                value={problemIds}
                onChange={(e) => setProblemIds(e.target.value)}
                placeholder="e.g., 1,2,3"
                className="bg-gray-800 text-gray-100 rounded-lg px-3 py-2 border border-gray-700 w-64"
              />
            </div>
          </section>

          {/* Teams Table */}
          <section className="bg-gray-900/80 rounded-2xl shadow-lg border border-gray-800 overflow-x-auto">
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-200">🏆 Registered Teams</h2>
            </div>
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-gray-800/90 text-gray-300 uppercase tracking-wide text-sm md:text-base">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-700 w-12">#</th>
                  <th className="px-4 py-3 border-b border-gray-700">Team Name</th>
                  <th className="px-4 py-3 border-b border-gray-700">Team Leader</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-right">Total Score</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.length > 0 ? (
                  teams.map((team, index) => (
                    <tr key={team._id} className="hover:bg-gray-800/50 transition-colors cursor-pointer">
                      <td className="px-4 py-3 border-b border-gray-800 text-gray-200 font-semibold">{index + 1}</td>
                      <td className="px-4 py-3 border-b border-gray-800 font-semibold text-emerald-300">{team.teamName}</td>
                      <td className="px-4 py-3 border-b border-gray-800 text-gray-200">{team.teamLeader}</td>
                      <td className="px-4 py-3 border-b border-gray-800 text-right text-emerald-400 font-bold">{team.totalScore}</td>
                      <td className="px-4 py-3 border-b border-gray-800 text-center flex gap-2 justify-center">
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
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-400">No teams found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}
