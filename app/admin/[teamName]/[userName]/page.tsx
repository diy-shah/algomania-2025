"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";


const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://54.204.245.101:5000";

// ✅ Define types
interface Submission {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timestamp: string;
  url: string;
}

interface Member {
  score: number;
  submissions: Submission[];
}

interface Params {
  teamName: string;
  userName: string;
}

export default function MemberProfilePage() {
  const router = useRouter();
  const params = useParams(); // ✅ cast params
  const { teamName, userName } = params;

  const [memberData, setMemberData] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchMemberData = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await axios.get<{ member: Member }>(
        `${apiUrl}/admin/${teamName}/member/${userName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { startDate, endDate },
        }
      );
      setMemberData(res.data.member);
    } catch (err) {
      console.error(err);
      setError("Could not load member data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-gray-950 text-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 p-6 flex flex-col border-r border-gray-800">
          <h2 className="text-xl font-bold mb-8">MyApp Admin</h2>
          <nav className="flex flex-col gap-4">
            <Button variant="ghost" className="justify-start" onClick={() => router.push("/admin")}>
              📊 Dashboard
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => router.push("/admin/allTeams")}>
              👥 All Teams
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => router.push("/admin/addTeams")}>
              ➕ Add Team
            </Button>
            <Button variant="ghost" className="justify-start text-green-400" onClick={() => router.push(`/admin/${teamName}`)}>
              🔙 Back to Team
            </Button>
            <Button variant="ghost" className="justify-start text-green-400" onClick={() => router.push("/admin/addnotes")}>
              ➕ Add Notes
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">{userName} - LeetCode Profile</h1>

          {/* Date Range Selection */}
          <div className="flex gap-4 mb-6">
            <div>
              <label className="block mb-1 text-sm">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-gray-800 border border-gray-700 p-2 rounded-md text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-gray-800 border border-gray-700 p-2 rounded-md text-gray-100"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={fetchMemberData}>Fetch Data</Button>
            </div>
          </div>

          {loading && <div className="text-gray-100">Loading...</div>}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {!loading && memberData && (
            <>
              <p className="mb-6 text-gray-300">
                Total Score: <span className="font-bold">{memberData.score}</span>
              </p>

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
                    {memberData.submissions.map((sub, index) => (
                      <tr key={index} className="hover:bg-gray-800/50">
                        <td className="px-4 py-2 border-b border-gray-800">{index + 1}</td>
                        <td className="px-4 py-2 border-b border-gray-800">{sub.title}</td>
                        <td
                          className={`px-4 py-2 border-b border-gray-800 font-bold ${
                            sub.difficulty === "Easy"
                              ? "text-green-400"
                              : sub.difficulty === "Medium"
                              ? "text-yellow-400"
                              : "text-red-500"
                          }`}
                        >
                          {sub.difficulty}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-800">{sub.timestamp}</td>
                        <td className="px-4 py-2 border-b border-gray-800">
                          <a
                            href={sub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
