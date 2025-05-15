"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Reset link sent",
      description: "If an account exists with this email, you will receive password reset instructions.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-custom-base to-custom-sub-base flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-custom-sub-base/50 backdrop-blur-lg border border-custom-title/20 text-custom-title">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-custom-base/50 border-custom-title/20 text-custom-title placeholder:text-custom-title/60"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send Reset Link
            </Button>
            <div className="text-center mt-4">
              <Link 
                href="/admin/login"
                className="text-custom-subtitle hover:text-custom-title transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}