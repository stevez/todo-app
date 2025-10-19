'use server';

import { ITask } from "@/types/tasks";
import { headers } from 'next/headers';

const baseUrl = "http://localhost:3001";

const getPrallelIndex = async () => {
  const headersList = await headers();
  const parallelIndex = headersList.get('x-parallel-index');
  return parallelIndex;
};

export const getHeaders: () => Promise<HeadersInit> = async () => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  
  const parallelIndex = await getPrallelIndex() ?? "0";
  headers.set("x-parallel-index", parallelIndex);
  
  return headers;
}
export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "GET", 
    headers: await getHeaders(),
    cache: "no-store"
  });
  const todos = await res.json();
  return todos;
};

//add task
export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

//edit task
export const editTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(todo),
  });
  const updatedTodo = await res.json();
  return updatedTodo;
};

//delete task
export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
    headers: await getHeaders(),
  });
};
