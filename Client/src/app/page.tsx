'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import { FloatingInput, Input } from '@/components/input';
import { Button } from '@/components/button';

export default function Home() {
  const [todoBody, setTodoBody] = useState('');
  const [todoPriority, setTodoPriority] = useState('');

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['backendCall'],
    queryFn: () =>
      fetch('http://localhost:5058/api/Todos').then(
        (res) => res.json()
      ),
  })

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:5058/api/Todos/${id}`, {
      method: 'DELETE',
    })

    refetch();
  }

  const updateTodo = async (id: number, {
    TodoBody,
    TodoPriority
  }: {
    TodoBody: string,
    TodoPriority: string
  }) => {
    await fetch(`http://localhost:5058/api/Todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        TodoBody,
        TodoPriority
      })
    })

    refetch();


  }

  const createTodo = async ({
    TodoBody,
    TodoPriority
  }: {
    TodoBody: string,
    TodoPriority: string
  }) => {
    await fetch(`http://localhost:5058/api/Todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        TodoBody,
        TodoPriority
      })
    })

    refetch();
  }


  if (isPending) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  data.sort((a: any, b: any) => a.todoId - b.todoId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <FloatingInput label="Todo Body" value={todoBody} onChange={(e) => setTodoBody(e.target.value)} />
        <FloatingInput label="Todo Priority" value={todoPriority} onChange={(e) => setTodoPriority(e.target.value)} />
        <Button onClick={() => createTodo({
          TodoBody: todoBody,
          TodoPriority: todoPriority
        })}>Create</Button>
      </div>
      
      {
        data.map((todo: any) => (
          
          <div key={todo.id} className="flex flex-col items-center justify-between p-4 border-2 border-gray-600 rounded-md">
            <pre>{JSON.stringify(todo)}</pre>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col items-center justify-between">
                <span className="text-2xl font-bold">{todo.id}</span>
              </div>
              <div className="flex flex-col items-center justify-between">
                <span className="text-2xl font-bold">{todo.todoBody}</span>
                <span className="text-2xl font-bold">{todo.todoPriority}</span>
              </div>
              <div className="flex flex-col items-center justify-between">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteTodo(todo.todoId)}>Delete</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => updateTodo(todo.todoId, { TodoBody: 'Updated', TodoPriority: 'Updated' })}>Update</button>
              </div>
            </div>
          </div>
        ))
      }

      
    </main>
  )
}
