"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signin } from "../actions/auth.actions";

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();

  const handleSubmit = async () => {
    const res = await signin({username, password})

    if (res.success) {
      router.push('/dashboard')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Sign In</h1>
      <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
        <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} className="text-black" />
        <input type="text" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} className="text-black" />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
