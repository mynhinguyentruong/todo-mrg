import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { generate_text } from "@/lib/cohere";

export async function POST(request: Request) {
  const body = await request.json()
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const text = await generate_text(body.text) 

  console.log({text})

  return NextResponse.json({ data: text })
  
}
