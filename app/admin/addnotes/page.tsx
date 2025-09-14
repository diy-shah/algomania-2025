"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from "@/components/side-navbar";
import { Megaphone, PlusSquare, Calendar, Trash2 } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://54.204.245.101:5000";

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

  const fetchNotices = async () => {
    try {
      const res = await axios.get<{ notices: Notice[] }>(
        `${apiUrl}/admin/view/notices`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setNotices(res.data.notices);
    } catch (err) {
      console.error("Error fetching notices:", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${apiUrl}/admin/add_notice`,
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/admin/delete_notice/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotices();
    } catch (err) {
      console.error("Error deleting notice:", err);
      alert("Failed to delete notice.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="admin" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <h1 className="flex items-center text-4xl md:text-5xl font-extrabold mb-8 text-emerald-400 drop-shadow-lg gap-3">
            <Megaphone size={36} /> Admin Notice Board
          </h1>

          {/* Add Notice Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 shadow-lg rounded-2xl p-6 mb-10 border border-gray-800"
          >
            <h2 className="flex items-center text-2xl font-semibold mb-6 text-cyan-400 gap-2">
              <PlusSquare size={24} /> Add a New Notice
            </h2>

            <Input
              type="text"
              placeholder="Notice Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              required
            />

            <Textarea
              placeholder="Write the notice message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mb-4 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-gray-400">
                  <Calendar size={16} /> Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-gray-400">
                  <Calendar size={16} /> End Date
                </label>
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
              className="w-full sm:w-auto py-3 text-lg font-semibold rounded-xl bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <PlusSquare size={20} /> Add Notice
            </Button>
          </form>

          {/* Notices List */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
              <Megaphone size={28} /> All Notices
            </h2>
            {notices.length === 0 ? (
              <p className="text-gray-400 text-center">No notices available.</p>
            ) : (
              <div className="grid gap-6">
                {notices.map((notice) => (
                  <div
                    key={notice._id}
                    className="p-6 bg-gray-900 shadow-md rounded-2xl border border-gray-800 hover:shadow-lg transition duration-200"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                          <Megaphone size={20} /> {notice.title}
                        </h3>
                        <p className="text-gray-300 mt-2">{notice.message}</p>
                        <p className="text-sm text-gray-400 mt-3 flex items-center gap-1">
                          <Calendar size={16} /> {new Date(notice.startDate).toLocaleDateString()} -{" "}
                          {new Date(notice.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Posted on: {new Date(notice.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm flex-shrink-0 flex items-center gap-2"
                        onClick={() => handleDelete(notice._id)}
                      >
                        <Trash2 size={16} /> Delete
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
