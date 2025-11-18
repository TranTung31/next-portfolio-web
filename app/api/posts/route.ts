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
