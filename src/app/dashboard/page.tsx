import { validateRequest } from "@/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const {user} = await validateRequest()

  if (!user) {
    return redirect('/')
  }

  return (
    <main>
      <div>
        <h1>Dashboard</h1>
      </div>
    </main>
  )
}