"use server"

import { lucia } from "@/auth"
import db from "@/db/database"
import { userTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { generateId } from "lucia"
import { cookies } from "next/headers"

type signupschema = {
  username: string
  password: string
}

export const signup = async ({username, password}: signupschema) => {
  const userId = generateId(15)

  try {
    
    await db.insert(userTable).values({
      id: userId,
      username,
      password
    }).returning({
      id: userTable.id,
      username: userTable.username
    })

    return {
      success: true,
      data: { userId }
    }

  } catch (error: any) {
    return {error: error?.message}
  }

}

export const signin = async ({username, password}: signupschema) => {
  const existingUser = await db.query.userTable.findFirst({
    where: (table) => eq(table.username, username)
  })

  if (!existingUser) {
    return {
      error: "User not found"
    }
  }

  const isValidPassword = password === existingUser.password

  if (!isValidPassword) {
    return {
      error: "Incorrect username or password"
    }
  }

  const session = await lucia.createSession(existingUser.id, {
    // Expires in 30 days
    expiresIn: 60 * 60 *24 * 30
  })

  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return {
    success: 'Logged in',
  }
}