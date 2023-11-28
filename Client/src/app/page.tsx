'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import { FloatingInput, Input } from '@/components/input';
import { Button } from '@/components/button';
import { getAuthenticatedAxiosInstance } from '@/lib/authentication';

import { useAuth } from '@/components/providers/AuthProvider';
import Link from 'next/link';

export default function Home() {
  const [todoBody, setTodoBody] = useState('');
  const [todoPriority, setTodoPriority] = useState('');

  const { isAuthenticated, email, loading, signOut } = useAuth();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['backendCall'],
    queryFn: () =>
      fetch('http://localhost:5058/api/v1/Todos').then(
        (res) => res.json()
      ),
  })

  const deleteTodo = async (id: number) => {
    try {
      const axiosInstance = await getAuthenticatedAxiosInstance();

      if (!axiosInstance) {
        throw new Error('Error creating todo');
      }

      await axiosInstance.delete(`http://localhost:5058/api/v1/Todos/${id}`)

      refetch();
    }
    catch(e) {
      alert('Error deleting todo')
    }
  }

  const updateTodo = async (id: number, {
    TodoBody,
    TodoPriority
  }: {
    TodoBody: string,
    TodoPriority: string
  }) => {
    await fetch(`http://localhost:5058/api/v1/Todos/${id}`, {
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

    try {
      const axiosInstance = await getAuthenticatedAxiosInstance();

      if (!axiosInstance) {
        throw new Error('Error creating todo');
      }

      await axiosInstance.post('http://localhost:5058/api/v1/Todos', {
        TodoBody,
        TodoPriority
      })

      refetch();
    }
    catch(e) {
      alert('Error creating todo')
    }
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
        {isAuthenticated ? (
          <div className="flex flex-col items-center justify-between">
            <span className="text-2xl font-bold">Authenticated</span>
            <span className="text-2xl font-bold">{email}</span>
            <Button onClick={() => signOut({
              redirect: false,
              callbackUrl: '/'
            })}>Logout</Button>
          </div>
        ) : (
          <div>
            <h1>Log in</h1>
            <Link href="/login">Login</Link>
          </div>
        )}
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
