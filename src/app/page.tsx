"use client"

import { useState } from "react";
import { signup } from "./actions/auth.actions";

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    const res = await signup({username, password})

    console.log(res.data)

    console.log(res.error)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
        <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} className="text-black" />
        <input type="text" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} className="text-black" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
