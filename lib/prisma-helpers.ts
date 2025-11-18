/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/prisma-helpers.ts

export async function handlePrismaError<T>(
  operation: () => Promise<T>
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await operation()
    return { data }
  } catch (error: any) {
    console.error('Prisma error:', error)

    if (error.code === 'P2002') {
      return { error: 'A record with this value already exists' }
    }
    if (error.code === 'P2025') {
      return { error: 'Record not found' }
    }

    return { error: 'Database operation failed' }
  }
}
