"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/side-navbar";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://3.211.30.133:5000";

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
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [router]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${apiUrl}/admin/all_teams`, {
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
    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar role="admin" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {/* Header */}
     <section className="mb-10">
  <h1 className="text-12xl md:text-6xl  font-extrabold font-mono uppercase 
                 bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-300 
                 bg-clip-text  drop-shadow-lg leading-tight">
    Admin Dashboard
  </h1>
  <p className="mt-4 text-lg md:text-xl text-gray-300 tracking-wide">
    Top 5 Teams Leaderboard
  </p>
</section>


          {/* Table Card */}
          <section className="bg-gray-900/80 rounded-2xl shadow-lg border border-gray-800 overflow-x-auto">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-gray-200 tracking-wide">
                🏆 Leaderboard
              </h2>
            </div>
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-gray-800/90 text-gray-300 uppercase tracking-wide text-sm md:text-base">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-700 w-12">#</th>
                  <th className="px-4 py-3 border-b border-gray-700">Team Name</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {teams.length > 0 ? (
                  teams.map((team, index) => (
                    <tr
                      key={team._id}
                      className="hover:bg-gray-800/60 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 border-b border-gray-800 text-gray-200 font-semibold">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-800 font-semibold uppercase text-emerald-300">
                        {team.teamName}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-800 text-right text-emerald-400 font-bold">
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
          </section>
        </main>
      </div>
    </div>
  );
}
