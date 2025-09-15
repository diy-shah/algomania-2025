"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/side-navbar";
import { UserPlus, Users, Trash2, PlusSquare, CheckCircle } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://algomania3.duckdns.org/api";

export default function AddTeamPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

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

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const [team, setTeam] = useState({
    teamLeader: "",
    teamName: "",
    teamLeaderMail: "",
    password: "",
    members: Array(8).fill({ userName: "" }), // start with 8 empty members
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeam((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index: number, value: string) => {
    setTeam((prev) => {
      const updatedMembers = [...prev.members];
      updatedMembers[index] = { userName: value };
      return { ...prev, members: updatedMembers };
    });
  };

  const addMember = () => {
    if (team.members.length < 10) {
      setTeam((prev) => ({
        ...prev,
        members: [...prev.members, { userName: "" }],
      }));
    }
  };

  const removeMember = (index: number) => {
    if (team.members.length > 8) {
      setTeam((prev) => {
        const updatedMembers = [...prev.members];
        updatedMembers.splice(index, 1);
        return { ...prev, members: updatedMembers };
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/admin/add_new/team`, team, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("✅ Team added successfully!");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add team");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="admin" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <header className="flex items-center mb-8 gap-3">
            <UserPlus size={36} className="text-cyan-400" />
            <h1 className="text-3xl md:text-4xl font-bold">Add New Team</h1>
          </header>

          <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Team Info */}
              <input
                type="text"
                name="teamLeader"
                placeholder="Team Leader"
                value={team.teamLeader}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
                required
              />
              <input
                type="text"
                name="teamName"
                placeholder="Team Name"
                value={team.teamName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
                required
              />
              <input
                type="email"
                name="teamLeaderMail"
                placeholder="Team Leader Email"
                value={team.teamLeaderMail}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={team.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
                required
              />

              {/* Members */}
              <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-400">
                <Users size={20} /> Team Members
              </h2>

              {team.members.map((member, index) => (
                <div key={index} className="flex gap-2 items-center mb-2 flex-wrap">
                  <input
                    type="text"
                    placeholder={`Member ${index + 1} Username`}
                    value={member.userName}
                    onChange={(e) => handleMemberChange(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                  {team.members.length > 8 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  )}
                </div>
              ))}

              {team.members.length < 10 && (
                <button
                  type="button"
                  onClick={addMember}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  <PlusSquare size={16} /> Add Member
                </button>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded text-lg transition"
              >
                <CheckCircle size={20} /> Submit Team
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
