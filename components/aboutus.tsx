"use client"

export default function AboutUsPage() {
  return (
    <div className="rounded-2xl bg-[#1a1a1a]/80 backdrop-blur-md p-10 shadow-[0_0_25px_rgba(168,85,247,0.5)] border border-[#06b6d4]/40">
   
   
      <h1 className="text-center text-4xl mt-2 font-bold mb-6 bg-gradient-to-r from-[#a855f7] via-[#06b6d4] to-[#84cc16] bg-clip-text text-transparent">
        About Algomania
      </h1>
      

      <p className="text-gray-300 text-lg leading-relaxed mb-6">
        Algomania is a month-long competitive coding event where teams battle 
        it out by solving challenging DSA problems. 
        Our mission is to bring coders together, foster collaboration, and 
        push problem-solving skills to the next level.
      </p>

      <p className="text-gray-300 text-lg leading-relaxed mb-6">
        Each team works through curated problem sets designed to test 
        algorithmic thinking, speed, and consistency. With real-time leaderboards, 
        exciting challenges, and a vibrant community, Algomania transforms 
        coding practice into an electrifying competition.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
        <div className="p-6 rounded-lg bg-[#0f0f0f]/60 border border-[#a855f7]/40 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <h2 className="text-xl font-semibold text-[#a855f7] mb-2">🚀 Mission</h2>
          <p className="text-gray-400 text-sm">
            To inspire and empower coders through competition, collaboration, and growth.
          </p>
        </div>
        
        <div className="p-6 rounded-lg bg-[#0f0f0f]/60 border border-[#06b6d4]/40 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <h2 className="text-md font-semibold text-[#06b6d4] mb-2">🌐Community</h2>
          <p className="text-gray-400 text-sm">
            A hub for programmers to learn, share knowledge, and compete globally.
          </p>
        </div>
        
        <div className="p-6 rounded-lg bg-[#0f0f0f]/60 border border-[#84cc16]/40 shadow-[0_0_15px_rgba(132,204,22,0.4)]">
          <h2 className="text-xl font-semibold text-[#84cc16] mb-2">🏆 Vision</h2>
          <p className="text-gray-400 text-sm">
            To become the most engaging coding arena for students and professionals alike.
          </p>
        </div>
      </div>
  

    </div>
  )
}
