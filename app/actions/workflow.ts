'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveWorkflowAction(payload: {
  id?: string;
  name: string;
  nodes: any[];
  edges: any[];
}) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  // If ID exists, update; otherwise, create new
  const workflow = payload.id 
    ? await prisma.workflow.update({
        where: { id: payload.id, userId },
        data: { name: payload.name, nodes: payload.nodes, edges: payload.edges },
      })
    : await prisma.workflow.create({
        data: { userId, name: payload.name, nodes: payload.nodes, edges: payload.edges },
      });

  revalidatePath('/'); // Refresh cache to reflect changes
  return workflow;
}