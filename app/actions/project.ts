// app/actions/project.ts
'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        featured: true,
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    return { success: true, data: projects }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return { success: false, error: 'Failed to fetch projects' }
  }
}

export async function createProject(data: {
  title: string
  description: string
  tags: string[]
  userId: string
}) {
  try {
    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        tags: data.tags,
        userId: data.userId,
      },
    })
    revalidatePath('/projects')
    return { success: true, data: project }
  } catch (error) {
    console.error('Error creating project:', error)
    return { success: false, error: 'Failed to create project' }
  }
}

export async function updateProject(
  id: string,
  data: Partial<{
    title: string
    description: string
    tags: string[]
    featured: boolean
  }>
) {
  try {
    const project = await prisma.project.update({
      where: { id },
      data,
    })
    revalidatePath('/projects')
    revalidatePath(`/projects/${id}`)
    return { success: true, data: project }
  } catch (error) {
    console.error('Error updating project:', error)
    return { success: false, error: 'Failed to update project' }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    })
    revalidatePath('/projects')
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, error: 'Failed to delete project' }
  }
}
