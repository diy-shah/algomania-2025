"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function AddTeamPage() {
  const router = useRouter();

  const [team, setTeam] = useState({
    teamLeader: "",
    teamName: "",
    teamLeaderMail: "",
    password: "",
    members: Array(8).fill({ userName: "" }), // start with 8 empty members
  });

  // Handle input changes for main fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeam((prev) => ({ ...prev, [name]: value }));
  };

  // Handle member username changes
  const handleMemberChange = (index: number, value: string) => {
    setTeam((prev) => {
      const updatedMembers = [...prev.members];
      updatedMembers[index] = { userName: value };
      return { ...prev, members: updatedMembers };
    });
  };

  // Add member (max 10)
  const addMember = () => {
    if (team.members.length < 10) {
      setTeam((prev) => ({
        ...prev,
        members: [...prev.members, { userName: "" }],
      }));
    }
  };

  // Remove member (min 8)
  const removeMember = (index: number) => {
    if (team.members.length > 8) {
      setTeam((prev) => {
        const updatedMembers = [...prev.members];
        updatedMembers.splice(index, 1);
        return { ...prev, members: updatedMembers };
      });
    }
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/add_new/team",
        team,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("✅ Team added successfully!");
      console.log(res.data);
      router.push("/admin"); // redirect back after adding team
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add team");
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
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => router.push("/admin")}
            >
              📊 Dashboard
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => router.push("/admin/allTeams")}>
              👥 All Teams
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-green-400"
              onClick={() => router.push("/admin/addTeams")}
            >
              ➕ Add Team
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">➕ Add New Team</h1>
          </header>

          <div className="bg-gray-900 rounded-xl shadow-md border border-gray-800 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="teamLeader"
                placeholder="Team Leader"
                value={team.teamLeader}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
                required
              />
              <input
                type="text"
                name="teamName"
                placeholder="Team Name"
                value={team.teamName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
                required
              />
              <input
                type="email"
                name="teamLeaderMail"
                placeholder="Team Leader Email"
                value={team.teamLeaderMail}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={team.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
                required
              />

              <h2 className="text-lg font-semibold">👥 Team Members</h2>
              {team.members.map((member, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Member ${index + 1} Username`}
                    value={member.userName}
                    onChange={(e) => handleMemberChange(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-700 rounded bg-gray-800 text-white"
                    required
                  />
                  {team.members.length > 8 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}

              {team.members.length < 10 && (
                <button
                  type="button"
                  onClick={addMember}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  + Add Member
                </button>
              )}

              <button
                type="submit"
                className="w-full p-2 bg-green-600 text-white rounded font-bold"
              >
                ✅ Submit Team
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
