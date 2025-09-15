"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/side-navbar";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://3.211.30.133:5000";

// Types
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

export default function MemberProfilePage() {
  const router = useRouter();
  const params = useParams();
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
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="admin" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {/* Header */}
          <section className="mb-8">
            <h1 className="text-5xl md:text-6xl font-extrabold font-mono uppercase bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-300 bg-clip-text drop-shadow-lg leading-tight">
              👤 {userName} Profile
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 tracking-wide">
              LeetCode Submissions & Score
            </p>
          </section>

          {/* Date Range Selection */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 min-w-[150px]">
              <label className="block mb-1 text-sm text-gray-400">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md text-gray-100"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block mb-1 text-sm text-gray-400">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md text-gray-100"
              />
            </div>
            <div className="flex sm:items-end mt-2 sm:mt-0">
              <Button
                onClick={fetchMemberData}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Fetch Data
              </Button>
            </div>
          </div>

          {/* Loading & Error */}
          {loading && <div className="text-gray-100">Loading...</div>}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {/* Member Data Table */}
          {!loading && memberData && (
            <>
              <p className="mb-6 text-gray-300 text-lg">
                Total Score: <span className="font-bold text-emerald-400">{memberData.score}</span>
              </p>

              <div className="bg-gray-900/80 rounded-2xl shadow-lg border border-gray-800 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="bg-gray-800/90 text-gray-300 uppercase tracking-wide text-sm md:text-base">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-700 w-12">#</th>
                      <th className="px-4 py-3 border-b border-gray-700">Title</th>
                      <th className="px-4 py-3 border-b border-gray-700">Difficulty</th>
                      <th className="px-4 py-3 border-b border-gray-700">Solved At</th>
                      <th className="px-4 py-3 border-b border-gray-700">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberData.submissions.map((sub, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-800/50 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 border-b border-gray-800">{index + 1}</td>
                        <td className="px-4 py-3 border-b border-gray-800">{sub.title}</td>
                        <td
                          className={`px-4 py-3 border-b border-gray-800 font-bold ${
                            sub.difficulty === "Easy"
                              ? "text-green-400"
                              : sub.difficulty === "Medium"
                              ? "text-yellow-400"
                              : "text-red-500"
                          }`}
                        >
                          {sub.difficulty}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-800">{sub.timestamp}</td>
                        <td className="px-4 py-3 border-b border-gray-800">
                          <a
                            href={sub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
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
