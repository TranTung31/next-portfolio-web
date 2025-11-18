// lib/prisma.ts

// import { PrismaClient } from '@prisma/client'
import { PrismaClient } from '../lib/generated/prisma/client'

/**
 * Tạo một singleton của client Prisma.
 * @returns {PrismaClient} client Prisma.
 */
const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })
}
/**
 * @property {PrismaClient} prismaGlobal - client Prisma.
 */
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

/**
 * Khai báo biến toàn cục chứa client Prisma.
 * Nếu đang trong môi trường production, sẽ trả về một client Prisma mới.
 * Nếu đang trong môi trường khác, sẽ trả về client Prisma đã được khởi tạo trước đó.
 * @returns {PrismaClient} client Prisma.
 */
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
