"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";

export default function TeamMemberPage() {
  const router = useRouter();
  const params = useParams(); // { teamName, userName }
  const { teamName, userName } = params;

  const [memberData, setMemberData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchMemberData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/team/${teamName}/member/${userName}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMemberData(res.data.member);
      } catch (err: any) {
        console.error("Error fetching member:", err.response?.data || err.message);
        setError("Could not load member data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [teamName, userName, router]);

  if (loading) return <div className="p-4 text-gray-100">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!memberData) return <div className="p-4 text-gray-100">No data found.</div>;

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
          <h1 className="text-2xl font-bold mb-6">{memberData.userName} - LeetCode Profile</h1>
          <p className="mb-4">Total Score: <span className="font-bold">{memberData.score}</span></p>

          <div className="bg-gray-900 rounded-xl shadow-md border border-gray-800 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-700 w-12">#</th>
                  <th className="px-4 py-2 border-b border-gray-700">Title</th>
                  <th className="px-4 py-2 border-b border-gray-700">Difficulty</th>
                  <th className="px-4 py-2 border-b border-gray-700">Solved At</th>
                  <th className="px-4 py-2 border-b border-gray-700">Link</th>
                </tr>
              </thead>
              <tbody>
                {memberData.submissions.map((sub: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-800/50">
                    <td className="px-4 py-2 border-b border-gray-800">{index + 1}</td>
                    <td className="px-4 py-2 border-b border-gray-800">{sub.title}</td>
                    <td className={`px-4 py-2 border-b border-gray-800 font-bold ${
                      sub.difficulty === "Easy" ? "text-green-400" :
                      sub.difficulty === "Medium" ? "text-yellow-400" :
                      "text-red-500"
                    }`}>
                      {sub.difficulty}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-800">{sub.timestamp}</td>
                    <td className="px-4 py-2 border-b border-gray-800">
                      <a href={sub.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
