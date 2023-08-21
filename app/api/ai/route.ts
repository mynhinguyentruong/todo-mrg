import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { generate_text } from "@/lib/cohere";
import { Todo } from "@/app/types/db";
import { createTodos } from "@/lib/storage/TodoRepository";

export async function POST(request: Request) {
  const body = await request.json()
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const haha = body.text
  console.log({haha})
  console.log({haha})
  console.log({haha})

  const data: string = await generate_text(body.text) 
  
  const arr: Omit<Todo, "id" | "completed">[] = data.split('\n').map(text => {
    return {
      title: body.todoList.title,
      content: text,
      authorId: body.todoList.authorId,
      listId: body.todoList.id
    }
  })

  createTodos(arr).then(todos => console.log({todos})).catch(err => console.log({err}))
  
  return NextResponse.json({ status: 200 })  
}
