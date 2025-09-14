"use client"

import Image from "next/image"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-800 via-blue-900 to-slate-900 text-white py-20 px-6 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
          About AlgoMania
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 leading-relaxed pb-2">
          AlgoMania is a platform designed to simplify algorithm learning, team
          management, and coding challenges. We aim to empower teams and
          individuals to excel in problem solving.
        </p>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="bg-gray-900/50 p-8 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-3xl font-bold mb-4 text-emerald-400">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            To create a seamless platform where learners and teams can enhance
            their algorithmic skills, collaborate effectively, and prepare for
            real-world challenges.
          </p>
        </div>
        <div className="bg-gray-900/50 p-8 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-3xl font-bold mb-4 text-emerald-400">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed ">
            To become the leading hub for algorithm education and team
            productivity, fostering innovation, learning, and collaboration
            globally.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-900 py-16 px-6 py-2">
        <h2 className="py-2 text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
          Our Core Team
        </h2>
        <div className="max-w-6xl py-2 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Member */}
          {[
            { name: "Parikshit Desai", role: "Developer  ", img: "/parikshit.jpg" },
            { name: "Diya Shah", role: "Organising Team", img: "/diya.jpg" },
            { name: "Rohit Gatne", role: "Organising Team", img: "/rohit.jpg" },
          ].map((m) => (
            <div
              key={m.name}
              className="bg-gray-800 p-6 rounded-lg text-center shadow hover:scale-105 transition-transform"
            >
           
              <h3 className="font-bold text-lg text-white">{m.name}</h3>
              <p className="text-gray-400">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Faculty Section */}
      <section className="bg-gray-950 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-emerald-400 mt-2">
          DAA Faculty
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-2">
          {[
            { name: "Mrs. Sumitra A. Jakhete", role: "Faculty Coordinator" },
            { name: "Mr. Vinit T. Tribhuvan", role: "Faculty Coordinator" },
            { name: "Mrs. Prajakta S. Shinde", role: "Faculty Coordinator" },
          ].map((f) => (
            <div key={f.name} className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-bold text-lg text-white">{f.name}</h3>
              <p className="text-gray-400">{f.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-800 text-white py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4 mt-2">Get in Touch</h2>
        <p className="mb-6 text-gray-200">
          Have questions? Reach out to us at{" "}
          <span className="font-mono text-emerald-400">contact@algomania.com</span>
        </p>

        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { name: "Parikshit Desai", phone: "99974 31010" },
            { name: "Rohit Gatne", phone: "97630 97236" },
            { name: "Diya Shah", phone: "93259 68885" },
          ].map((c) => (
            <div key={c.name} className="bg-gray-800 p-4 rounded-lg shadow hover:scale-105 transition-transform">
              <h3 className="font-bold text-white">{c.name}</h3>
              <p className="text-gray-300">📞 {c.phone}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 text-gray-300">
          <a href="#" className="hover:text-sky-400 transition">Twitter</a>
          <a href="#" className="hover:text-sky-400 transition">LinkedIn</a>
          <a href="#" className="hover:text-sky-400 transition">GitHub</a>

        </div>
      </section>
    </div>
  )
}
