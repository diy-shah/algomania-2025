"use client"

import { useState, FormEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import axios from "axios"

interface LoginFormProps extends React.ComponentProps<"div"> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [teamName, setTeamName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<"Team" | "admin">("Team")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      
      const response = await axios.post("http://localhost:5000/login", {
        name: teamName,   // backend expects "name"
        password,
        role: role === "Team" ? "user" : "admin", // backend uses "user" not "Team"
      })

      const { token, role: returnedRole } = response.data

      // Save token securely (for demo localStorage is fine, but cookies are safer)
      localStorage.setItem("token", token)
      localStorage.setItem("role", returnedRole)

      // Redirect based on role
      if (returnedRole === "admin") {
        router.push("/admin")
      } else {
        router.push("/team/dashboard")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {localStorage.removeItem("token");}
  }, [])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>

        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Team Name */}
              <div className="grid gap-3">
                <Label htmlFor="team-name">Team name</Label>
                <Input
                  id="team-name"
                  type="text"
                  placeholder="codewarriors"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>

              {/* Password with eye toggle */}
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value as "Team" | "admin")
                  }
                  className="bg-white text-black p-2 rounded"
                >
                  <option value="Team">Team</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              {/* Submit Button */}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full h-12 text-lg"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
