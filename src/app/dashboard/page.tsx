import { validateRequest } from "@/auth"
import { redirect } from "next/navigation"
import { signout } from "../actions/auth.actions"

export default async function Dashboard() {
  // Checking for user object to protect route
  const {user} = await validateRequest()

  if (!user) {
    return redirect('/')
  }

  return (
    <main>
      <div>
        <h1>Dashboard</h1>
      </div>
      <form action={signout}>
        <button type='submit'>Sign Out</button>
      </form>
    </main>
  )
}