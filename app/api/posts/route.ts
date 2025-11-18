import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/posts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, content, imgPath, tags, userId } = body

    if (!title || !slug || !content || !userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields (title, slug, content, userId)',
        },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: { title, slug, content, imgPath, tags: tags || [], userId },
    })

    return NextResponse.json({ success: true, data: post }, { status: 201 })
  } catch (error) {
    console.error('POST /api/posts error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

// GET /api/posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const skip = (page - 1) * pageSize

    const posts = await prisma.post.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    const total = await prisma.post.count()

    return NextResponse.json(
      { success: true, data: posts, page, pageSize, total },
      { status: 200 }
    )
  } catch (error) {
    console.error('GET /api/posts error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
