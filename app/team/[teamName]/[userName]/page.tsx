"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/side-navbar";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://algomania3.duckdns.org/api";

export default function TeamMemberPage() {
  const router = useRouter();
  const params = useParams(); // { teamName, userName }
  const { teamName, userName } = params;

  const [token, setToken] = useState<string | null>(null);
  const [memberData, setMemberData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fetched, setFetched] = useState(false);

  // Check login token
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

  const fetchMemberData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${apiUrl}/team/${teamName}/member/${userName}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { startDate: startDate || undefined, endDate: endDate || undefined },
      });
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar role="team" />

        {/* Main */}
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {/* Member Header */}
          <section className="mb-8">
            <h1 className="text-3xl font-extrabold font-mono uppercase bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent drop-shadow">
              👤 {userName} - Profile
            </h1>
            <p className="mt-2 text-gray-400">
              Team: <span className="text-gray-100 font-semibold">{teamName}</span>
            </p>
          </section>

          {/* Date Filters */}
          <section className="flex flex-col sm:flex-row gap-4 mb-8">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-gray-100"
              />
            </div>
            <button
              onClick={fetchMemberData}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-600 mt-2 sm:mt-0"
              disabled={!startDate || !endDate}
            >
              Apply
            </button>
          </section>

          {/* Status Messages */}
          {loading && <p className="text-gray-100">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!fetched && !loading && <p className="text-gray-400">Select a date range to view submissions.</p>}

          {/* Member Submissions */}
          {fetched && memberData && (
            <section className="space-y-6">
              {/* Total Score Card */}
              <div className="p-6 bg-gray-900/80 border border-gray-800 rounded-xl shadow-lg backdrop-blur-sm">
                <h2 className="text-xl font-bold text-gray-200 mb-2">Total Score</h2>
                <p className="text-3xl font-extrabold text-emerald-400">{memberData.score}</p>
              </div>

              {/* Submissions */}
              {memberData.submissions.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {memberData.submissions.map((sub: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-5 bg-gray-900/80 border border-gray-800 rounded-xl shadow-lg backdrop-blur-sm hover:scale-[1.02] transition-transform"
                    >
                      <h3 className="text-lg font-bold text-yellow-400">{sub.title}</h3>
                      <p
                        className={`mt-1 font-semibold ${
                          sub.difficulty === "Easy"
                            ? "text-green-400"
                            : sub.difficulty === "Medium"
                            ? "text-yellow-400"
                            : "text-red-500"
                        }`}
                      >
                        {sub.difficulty}
                      </p>
                      <p className="text-gray-300 mt-2">Solved At: {sub.timestamp}</p>
                      <a
                        href={sub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline mt-2 inline-block"
                      >
                        View Problem
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No submissions found in this date range.</p>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
