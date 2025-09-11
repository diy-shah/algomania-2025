"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";

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
        const res = await axios.get("http://localhost:5000/team/myteam", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTeam(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeam();
  }, [router]);

  const handleMemberClick = (teamName: string,userName: string) => {
    router.push(`/team/${teamName}/${userName}`);
  };

  if (!team) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-gray-950 text-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 p-6 flex flex-col border-r border-gray-800">
          <h2 className="text-xl font-bold mb-8">My Team</h2>
          <nav className="flex flex-col gap-4">
            <button
              className="text-left text-gray-200 hover:text-white"
              onClick={() => router.push("/team/dashboard")}
            >
              📊 Dashboard
            </button>
            <button
              className="text-left text-gray-200 hover:text-white"
              onClick={() => router.push("/team/team_info")}
            >
              👥 Team Info
            </button>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">{team.teamName} Dashboard</h1>

          <div className="bg-gray-900 rounded-xl shadow-md border border-gray-800 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-700 w-12">#</th>
                  <th className="px-4 py-2 border-b border-gray-700">Member Name</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-right">Score</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {team.members.map((member: any, index: number) => (
                  <tr key={member._id} className="hover:bg-gray-800/50">
                    <td className="px-4 py-2 border-b border-gray-800">{index + 1}</td>
                    <td className="px-4 py-2 border-b border-gray-800">{member.userName}</td>
                    <td className="px-4 py-2 border-b border-gray-800 text-right">{member.score}</td>
                    <td className="px-4 py-2 border-b border-gray-800 text-center">
                      <button
                        className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700"
                        onClick={() => handleMemberClick(team.teamName,member.userName)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} className="px-4 py-2 font-bold text-right border-t border-gray-700">Total Score:</td>
                  <td className="px-4 py-2 font-bold text-right border-t border-gray-700">{team.totalScore}</td>
                  <td className="border-t"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
