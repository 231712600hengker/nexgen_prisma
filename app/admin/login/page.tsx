"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { useAdminStore } from '@/lib/store'
import Link from 'next/link'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAdminStore()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const loginResult = login(username, password)
    
    if (loginResult) {
      if (username === 'admin123') {
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        })
        router.push('/admin/dashboard')
      } else if (username === 'user123') {
        toast({
          title: "Login successful",
          description: "Welcome back",
        })
        router.push('/')
      }
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      })
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are the same.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Registration successful",
      description: "Please check your email to verify your account.",
    })
    setIsRegisterOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-custom-base to-custom-sub-base flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-custom-sub-base/50 backdrop-blur-lg border border-custom-title/20 text-custom-title">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-custom-base/50 border-custom-title/20 text-custom-title placeholder:text-custom-title/60"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-custom-base/50 border-custom-title/20 text-custom-title placeholder:text-custom-title/60"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Login
            </Button>
            <div className="text-center mt-4 space-y-2">
              <Link 
                href="/admin/forgot-password"
                className="block text-custom-subtitle hover:text-custom-title transition-colors"
              >
                Forgot password?
              </Link>
              <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="link" 
                    className="text-custom-subtitle hover:text-custom-title transition-colors"
                  >
                    Don't have an account? Register here
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-custom-sub-base/95 backdrop-blur-lg border-custom-title/20 text-custom-title">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-center">Create Account</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleRegister} className="space-y-4 mt-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="bg-custom-base/50 border-custom-title/20 text-custom-title placeholder:text-custom-title/60"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-custom-base/50 border-custom-title/20 text-custom-title placeholder:text-custom-title/60"
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="bg-custom-base/50 border-custom-title/20 text-custom-title placeholder:text-custom-title/60"
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="bg-custom-base/50 border-custom-title/20 text-custom-title placeholder:text-custom-title/60"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      Register
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}