"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Notice {
  _id: string;
  title: string;
  message: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export default function AdminNoticesPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notices, setNotices] = useState<Notice[]>([]);

  // Fetch all notices
  const fetchNotices = async () => {
    try {
      const res = await axios.get<{ notices: Notice[] }>(
        "http://localhost:5000/admin/view/notices",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setNotices(res.data.notices);
    } catch (err) {
      console.error("Error fetching notices:", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle add notice
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/admin/add_notice",
        { title, message, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setMessage("");
      setStartDate("");
      setEndDate("");
      fetchNotices();
    } catch (err) {
      console.error("Error adding notice:", err);
    }
  };

  // Handle delete notice
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/admin/delete_notice/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotices();
    } catch (err) {
      console.error("Error deleting notice:", err);
      alert("Failed to delete notice.");
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
            <Button variant="ghost" className="justify-start" onClick={() => (window.location.href = "/admin")}>
              📊 Dashboard
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => (window.location.href = "/admin/allTeams")}>
              👥 All Teams
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => (window.location.href = "/admin/addTeams")}>
              ➕ Add Team
            </Button>
            <Button variant="ghost" className="justify-start text-green-400" onClick={() => (window.location.href = "/admin/addnotes")}>
              ➕ Add Notes
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-extrabold mb-8">📢 Admin Notice Board</h1>

          {/* Add Notice Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 shadow-lg rounded-2xl p-6 mb-10 border border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-6">Add a New Notice</h2>

            <Input
              type="text"
              placeholder="Notice Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4 bg-gray-800 border-gray-700 text-white"
              required
            />

            <Textarea
              placeholder="Write the notice message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mb-4 bg-gray-800 border-gray-700 text-white"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium block mb-1">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold rounded-xl bg-green-600 hover:bg-green-700"
            >
              ➕ Add Notice
            </Button>
          </form>

          {/* Notices List */}
          <div>
            <h2 className="text-2xl font-bold mb-6">All Notices</h2>
            {notices.length === 0 ? (
              <p className="text-gray-400 text-center">No notices available.</p>
            ) : (
              <div className="grid gap-6">
                {notices.map((notice) => (
                  <div
                    key={notice._id}
                    className="p-6 bg-gray-900 shadow-md rounded-2xl border border-gray-800 hover:shadow-lg transition duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-green-400">{notice.title}</h3>
                        <p className="text-gray-300 mt-2">{notice.message}</p>
                        <p className="text-sm text-gray-400 mt-3">
                          🗓 {new Date(notice.startDate).toLocaleDateString()} -{" "}
                          {new Date(notice.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Posted on: {new Date(notice.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm"
                        onClick={() => handleDelete(notice._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
