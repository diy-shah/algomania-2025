"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "54.204.245.101:5000";

export default function TeamMemberPage() {
  const router = useRouter();
  const params = useParams(); // { teamName, userName }
  const { teamName, userName } = params;

  const [memberData, setMemberData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fetched, setFetched] = useState(false);

  const fetchMemberData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `${apiUrl}/team/${teamName}/member/${userName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            startDate: startDate || undefined,
            endDate: endDate || undefined,
          },
        }
      );
      setMemberData(res.data.member);
      setFetched(true);
    } catch (err: any) {
      console.error("Error fetching member:", err.response?.data || err.message);
      setError("Could not load member data.");
      setFetched(true);
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
          <h1 className="text-2xl font-bold mb-6">
            {userName} - LeetCode Profile
          </h1>

          {/* Date Filter (API) */}
          <div className="flex items-end gap-4 mb-6">
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-gray-100"
              />
            </div>
            <button
              onClick={fetchMemberData}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-600"
              disabled={!startDate || !endDate}
            >
              Apply
            </button>
          </div>

          {/* States */}
          {loading && <div className="text-gray-100">Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {!fetched && (
            <div className="text-gray-400">
              Please select a date range to view submissions.
            </div>
          )}
          {fetched && !loading && !error && memberData && (
            <>
              <p className="mb-4">
                Total Score:{" "}
                <span className="font-bold">{memberData.score}</span>
              </p>

              {/* Submissions Table */}
              <div className="bg-gray-900 rounded-xl shadow-md border border-gray-800 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-800 text-gray-300">
                    <tr>
                      <th className="px-4 py-2 border-b border-gray-700 w-12">
                        #
                      </th>
                      <th className="px-4 py-2 border-b border-gray-700">
                        Title
                      </th>
                      <th className="px-4 py-2 border-b border-gray-700">
                        Difficulty
                      </th>
                      <th className="px-4 py-2 border-b border-gray-700">
                        Solved At
                      </th>
                      <th className="px-4 py-2 border-b border-gray-700">
                        Link
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberData.submissions.length > 0 ? (
                      memberData.submissions.map((sub: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-800/50">
                          <td className="px-4 py-2 border-b border-gray-800">
                            {index + 1}
                          </td>
                          <td className="px-4 py-2 border-b border-gray-800">
                            {sub.title}
                          </td>
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
                          <td className="px-4 py-2 border-b border-gray-800">
                            {sub.timestamp}
                          </td>
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
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-4 text-center text-gray-400"
                        >
                          No submissions found.
                        </td>
                      </tr>
                    )}
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
