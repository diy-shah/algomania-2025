"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/side-navbar";

type Member = {
  _id: string;
  userName: string;
  score: number;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://54.204.245.101:5000";

type Team = {
  teamName: string;
  members: Member[];
  totalScore: number;
};

export default function AdminTeamPage() {
  const router = useRouter();
  const params = useParams();
  const teamName = params.teamName;
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${apiUrl}/admin/team/${teamName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeam(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeam();
  }, [teamName, router]);

  if (!team)
    return (
      <div className="flex justify-center items-center h-screen text-gray-300">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="admin" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {/* Header */}
          <section className="mb-8">
            <h1 className="text-8xl md:text-6xl font-extrabold font-mono uppercase bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-300 bg-clip-text  drop-shadow-lg leading-tight">
              🏢 {team.teamName} Info
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 tracking-wide">
              Team members and scores
            </p>
          </section>

          {/* Members Table */}
          <section className="bg-gray-900/80 rounded-2xl shadow-lg border border-gray-800 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-gray-800/90 text-gray-300 uppercase tracking-wide text-sm md:text-base">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-700 w-12">#</th>
                  <th className="px-4 py-3 border-b border-gray-700">Member Name</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {team.members.map((member, index) => (
                  <tr
                    key={member._id}
                    className="hover:bg-gray-800/50 cursor-pointer transition-colors"
                    onClick={() => router.push(`/admin/${teamName}/${member.userName}`)}
                  >
                    <td className="px-4 py-3 border-b border-gray-800 text-gray-200 font-semibold">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-800 text-emerald-300 font-semibold">
                      {member.userName}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-800 text-right text-emerald-400 font-bold">
                      {member.score}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-800/70">
                  <td colSpan={2} className="px-4 py-3 font-bold text-right border-t border-gray-700">
                    Total Score:
                  </td>
                  <td className="px-4 py-3 font-bold text-right border-t border-gray-700 text-emerald-400">
                    {team.totalScore}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}
