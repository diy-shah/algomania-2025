"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/side-navbar";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://54.204.245.101:5000";

export default function TeamDashboard() {
  const router = useRouter();
  const [team, setTeam] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${apiUrl}/team/myTeam`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTeam(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeam();
  }, [router]);

  const handleMemberClick = (teamName: string, userName: string) => {
    router.push(`/team/${teamName}/${userName}`);
  };

  if (!team)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-100">
        <p className="animate-pulse text-lg">Loading team data...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar role="team" />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-x-auto">
          {/* Team Name */}
          <h1 className="text-4xl font-extrabold mb-4 tracking-wide font-mono uppercase bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent drop-shadow-md">
            {team.teamName}
          </h1>

          {/* Rank */}
          <h2 className="text-xl font-semibold text-gray-300 mb-8 font-sans">
            Current Rank:{" "}
            <span className="text-emerald-400 font-extrabold text-2xl">
              #{team.rank}
            </span>
          </h2>

          {/* Members Table */}
          <div className="bg-gray-900/80 rounded-xl shadow-xl border border-gray-800 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans">
                <thead className="bg-gray-800/80 text-gray-300 text-sm md:text-base uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-3 border-b border-gray-700 w-12">#</th>
                    <th className="px-4 py-3 border-b border-gray-700">Member Name</th>
                    <th className="px-4 py-3 border-b border-gray-700 text-right">Score</th>
                    <th className="px-4 py-3 border-b border-gray-700 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {team.members.map((member: any, index: number) => (
                    <tr
                      key={member._id}
                      className="hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 py-3 border-b border-gray-800 text-sm md:text-base">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-800 text-sm md:text-base font-medium">
                        {member.userName}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-800 text-right text-sm md:text-base text-emerald-300 font-semibold">
                        {member.score}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-800 text-center">
                        <button
                          className="px-3 py-1.5 rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold hover:from-emerald-400 hover:to-teal-500 transition shadow-md"
                          onClick={() =>
                            handleMemberClick(team.teamName, member.userName)
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Total Score Row */}
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-3 font-semibold text-right border-t border-gray-700 text-gray-300"
                    >
                      Total Score:
                    </td>
                    <td className="px-4 py-3 font-bold text-right border-t border-gray-700 text-emerald-400 text-lg">
                      {team.totalScore}
                    </td>
                    <td className="border-t"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
