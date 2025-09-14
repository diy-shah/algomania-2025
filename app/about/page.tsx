"use client"

import Image from "next/image"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-800 via-blue-900 to-slate-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          About AlgoMania
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          AlgoMania is a platform designed to simplify algorithm learning, team management, and coding challenges. We aim to empower teams and individuals to excel in problem solving.
        </p>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            To create a seamless platform where learners and teams can enhance their algorithmic skills, collaborate effectively, and prepare for real-world challenges.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-700">
            To become the leading hub for algorithm education and team productivity, fostering innovation, learning, and collaboration globally.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Team Member */}
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow hover:shadow-lg transition">
            <Image
              src="/team1.jpg"
              alt="Team Member 1"
              width={120}
              height={120}
              className="mx-auto rounded-full mb-4"
            />
            <h3 className="font-bold text-lg">Alice Johnson</h3>
            <p className="text-gray-600">Frontend Developer</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg text-center shadow hover:shadow-lg transition">
            <Image
              src="/team2.jpg"
              alt="Team Member 2"
              width={120}
              height={120}
              className="mx-auto rounded-full mb-4"
            />
            <h3 className="font-bold text-lg">Bob Smith</h3>
            <p className="text-gray-600">Backend Developer</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg text-center shadow hover:shadow-lg transition">
            <Image
              src="/team3.jpg"
              alt="Team Member 3"
              width={120}
              height={120}
              className="mx-auto rounded-full mb-4"
            />
            <h3 className="font-bold text-lg">Carol Lee</h3>
            <p className="text-gray-600">UI/UX Designer</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg text-center shadow hover:shadow-lg transition">
            <Image
              src="/team4.jpg"
              alt="Team Member 4"
              width={120}
              height={120}
              className="mx-auto rounded-full mb-4"
            />
            <h3 className="font-bold text-lg">David Kim</h3>
            <p className="text-gray-600">Product Manager</p>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section className="bg-gray-900 text-white py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="mb-4">Have questions? Reach out to us at <span className="font-mono">contact@algomania.com</span></p>
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:text-blue-400 transition">Twitter</a>
          <a href="#" className="hover:text-blue-400 transition">LinkedIn</a>
          <a href="#" className="hover:text-blue-400 transition">GitHub</a>
        </div>
      </section>
    </div>
  )
}
