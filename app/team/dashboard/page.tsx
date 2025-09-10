"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar";
export default function DashboardPage() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
     
        const handleStorageChange = () => {
            const newToken = localStorage.getItem('token');
            setToken(newToken);
            if (!newToken) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                router.push('/');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

  return (

    <div>
      <Navbar/>
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 flex flex-col border-r border-gray-800">
        <h2 className="text-xl font-bold mb-8">MyApp</h2>
        <nav className="flex flex-col gap-4">
          <Button variant="ghost" className="justify-start"  onClick={() => {
            // Navigate to dashboard
          router.push("/team/dashboard");
          }}>
            📊 Dashboard
          </Button>
          <Button variant="ghost" className="justify-start"  onClick={() => {
            // Navigate to dashboard
            router.push("/team/team_info");
          }}>
            👥 Team
          </Button>
         
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>

        {/* Top Teams Table */}
        <div className="bg-gray-900 rounded-xl shadow-md border border-gray-800">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold">🏆 Top 5 Teams</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-700 w-12">#</th>
                  <th className="px-4 py-2 border-b border-gray-700">Team Name</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-800/50">
                  <td className="px-4 py-2 border-b border-gray-800">1</td>
                  <td className="px-4 py-2 border-b border-gray-800">Team1</td>
                  <td className="px-4 py-2 border-b border-gray-800 text-right">150</td>
                </tr>
                <tr className="hover:bg-gray-800/50">
                  <td className="px-4 py-2 border-b border-gray-800">2</td>
                  <td className="px-4 py-2 border-b border-gray-800">Team2</td>
                  <td className="px-4 py-2 border-b border-gray-800 text-right">140</td>
                </tr>
                <tr className="hover:bg-gray-800/50">
                  <td className="px-4 py-2 border-b border-gray-800">3</td>
                  <td className="px-4 py-2 border-b border-gray-800">Team3</td>
                  <td className="px-4 py-2 border-b border-gray-800 text-right">130</td>
                </tr>
                <tr className="hover:bg-gray-800/50">
                  <td className="px-4 py-2 border-b border-gray-800">4</td>
                  <td className="px-4 py-2 border-b border-gray-800">Team4</td>
                  <td className="px-4 py-2 border-b border-gray-800 text-right">120</td>
                </tr>
                <tr className="hover:bg-gray-800/50">
                  <td className="px-4 py-2">5</td>
                  <td className="px-4 py-2">Team5</td>
                  <td className="px-4 py-2 text-right">110</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div></div>
  )
}
