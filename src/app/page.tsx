import {database} from "@/db/database"
import { bids as bidsSchema } from "@/db/schema";

export default async function Home() {
  const bids = await database.query.bids.findMany()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={async (formData: FormData) => {
        'use server'
        await database.insert(bidsSchema).values({
          amount: 5,
          timestamp: new Date()
        })
      }}>
        <input type="text" name="bid" placeholder="bid" />
        <button type="submit">Submit</button>
      </form>

      {bids.map((bid) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}
