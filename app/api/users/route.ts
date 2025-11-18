import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, bio, avatar } = body

    if (!email || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (email, name)' },
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        bio,
        avatar,
      },
    })

    return NextResponse.json({ success: true, data: user }, { status: 201 })
  } catch (error) {
    console.error('POST /api/users error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
