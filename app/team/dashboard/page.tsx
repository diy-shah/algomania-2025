"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/side-navbar";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://54.204.245.101:5000";

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

  // Fetch teams + notices
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${apiUrl}/team/topteams`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTeams(res.data.slice(0, 5)); // top 5
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };

    const fetchNotices = async () => {
      try {
        const res = await axios.get(`${apiUrl}/team/view/notices`, {
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar role="team" />

        {/* Main */}
        <main className="flex-1 p-6 md:p-10 overflow-x-auto">
          {/* Notices */}
          {notices.length > 0 && (
            <section className="mb-10">
              <h1 className="text-3xl font-extrabold mb-6 font-mono uppercase bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow">
                📢 Important Notices
              </h1>
              <div className="space-y-5">
                {notices.map((notice) => (
                  <div
                    key={notice._id}
                    className="p-5 bg-gray-900/80 border border-gray-800 rounded-xl shadow-lg backdrop-blur-sm transition hover:scale-[1.01]"
                  >
                    <h3 className="text-xl font-bold text-yellow-400 tracking-wide">
                      {notice.title}
                    </h3>
                    <p className="text-gray-200 mt-2 leading-relaxed">
                      {notice.message}
                    </p>
                    <p className="text-sm text-gray-400 mt-3">
                      🗓{" "}
                      {new Date(notice.startDate).toLocaleDateString()} -{" "}
                      {new Date(notice.endDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Leaderboard */}
          <section>
            <header className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-extrabold font-mono uppercase bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent drop-shadow">
                🏆 Top 5 Teams
              </h1>
            </header>

            <div className="bg-gray-900/80 rounded-xl shadow-lg border border-gray-800 backdrop-blur-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-gray-300 tracking-wide">
                  Leaderboard
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans">
                  <thead className="bg-gray-800/80 text-gray-300 text-sm md:text-base uppercase tracking-wide">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-700 w-12">
                        #
                      </th>
                      <th className="px-4 py-3 border-b border-gray-700">
                        Team Name
                      </th>
                      <th className="px-4 py-3 border-b border-gray-700 text-right">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.length > 0 ? (
                      teams.map((team, index) => (
                        <tr
                          key={team._id}
                          className="hover:bg-gray-800/50 transition-colors cursor-pointer"
                        >
                          <td className="px-4 py-3 border-b border-gray-800">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-800 font-semibold uppercase tracking-wide">
                            {team.teamName}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-800 text-right text-emerald-300 font-bold">
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
          </section>
        </main>
      </div>
    </div>
  );
}
