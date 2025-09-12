"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

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

  if (!team) return <div>Loading...</div>;

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
            <Button variant="ghost" className="justify-start text-green-400" onClick={() => router.push("/admin/addTeams")}>
              ➕ Add Team
            </Button>
             <Button
              variant="ghost"
              className="justify-start text-green-400"
              onClick={() => router.push("/admin/addnotes")}
            >
              ➕ Add Notes
            </Button>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">{team.teamName} Info</h1>

          <div className="bg-gray-900 rounded-xl shadow-md border border-gray-800 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-700 w-12">#</th>
                  <th className="px-4 py-2 border-b border-gray-700">Member Name</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {team.members.map((member, index) => (
                  <tr
                    key={member._id}
                    className="hover:bg-gray-800/50 cursor-pointer"
                    onClick={() => router.push(`/admin/${teamName}/${member.userName}`)}
                  >
                    <td className="px-4 py-2 border-b border-gray-800">{index + 1}</td>
                    <td className="px-4 py-2 border-b border-gray-800">{member.userName}</td>
                    <td className="px-4 py-2 border-b border-gray-800 text-right">{member.score}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} className="px-4 py-2 font-bold text-right border-t border-gray-700">
                    Total Score:
                  </td>
                  <td className="px-4 py-2 font-bold text-right border-t border-gray-700">{team.totalScore}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
