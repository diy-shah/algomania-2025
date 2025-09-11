"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminNoticesPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notices, setNotices] = useState([]);

  // Fetch all notices
  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/view/notices", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotices(res.data.notices);
    } catch (err) {
      console.error("Error fetching notices:", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle add notice
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      await axios.post(
        "http://localhost:5000/admin/add_notice",
        { title, message, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Reset form
      setTitle("");
      setMessage("");
      setStartDate("");
      setEndDate("");

      // Refresh notices
      fetchNotices();
    } catch (err) {
      console.error("Error adding notice:", err);
    }
  };

  // Handle delete notice
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/admin/delete_notice/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh notices after deletion
      fetchNotices();
    } catch (err) {
      console.error("Error deleting notice:", err);
      alert("Failed to delete notice.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📢 Admin Notice Board</h1>

      {/* Add Notice Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add a New Notice</h2>

        <Input
          type="text"
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3"
          required
        />

        <Textarea
          placeholder="Write the notice message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-3"
          required
        />

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label className="text-sm font-medium">Start Date</label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">End Date</label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          ➕ Add Notice
        </Button>
      </form>

      {/* Notices List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Notices</h2>
        {notices.length === 0 ? (
          <p className="text-gray-500">No notices available.</p>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="p-4 bg-gray-50 shadow rounded-xl border flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-bold">{notice.title}</h3>
                  <p className="text-gray-700 mt-1">{notice.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    🗓 {new Date(notice.startDate).toLocaleDateString()} -{" "}
                    {new Date(notice.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    Posted on: {new Date(notice.createdAt).toLocaleString()}
                  </p>
                </div>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white h-10 self-start"
                  onClick={() => handleDelete(notice._id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
