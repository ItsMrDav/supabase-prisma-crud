'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';
import { ListViewType, taskSchema } from './types';
/////////////////////////////// CREATE ACTION /////////////////////////////////////
export async function createTaskAction(formData: FormData) {
  const parsed = taskSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    console.error('[createTaskAction] validation failed');
    return;
  }

  try {
    await prisma.todo.create({
      data: {
        title: parsed.data.title,
        desc: parsed.data.desc,
      },
    });
    revalidatePath('/');
  } catch (err) {
    console.error('[createdTaskAction] Prisma error:', err);
  }
}
/////////////////////////////// RETRIVE ACTION /////////////////////////////////////
export async function retrieveTaskAction() {
  const myList: ListViewType[] = await prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      desc: true,
    },
    orderBy: { id: 'desc' },
  });

  return myList;
}
/////////////////////////////// UPDATE ACTION /////////////////////////////////////
export async function updateTaskAction(formData: FormData) {
  const id = Number(formData.get('id'));
  const title = formData.get('title') as string;
  const desc = formData.get('desc') as string;

  if (!id) return;

  const parsed = taskSchema.safeParse({ title, desc });
  if (!parsed.success) {
    console.error('[editTaskAction] validation failed');
    return;
  }

  try {
    await prisma.todo.update({
      where: { id },
      data: { ...parsed.data },
    });
    revalidatePath('/');
  } catch (err) {
    console.error('[editTaskAction] Prisma error:', err);
  }
}
/////////////////////////////// DELETE ACTION /////////////////////////////////////
export async function deleteTaskAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) return;

  try {
    await prisma.todo.delete({ where: { id } });
    revalidatePath('/');
  } catch (err) {
    console.error('[deleteTaskAction] Prisma error:', err);
  }
}
