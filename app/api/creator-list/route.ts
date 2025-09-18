import { NextResponse } from 'next/server'
import { z } from 'zod'
import { insertCreatorListSubmission } from '@/lib/supabase-admin'

const payloadSchema = z.object({
  website: z.string().url(),
  workEmail: z.string().email(),
})

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch (error) {
    console.error('Invalid JSON for creator list submission', error)

    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  const result = payloadSchema.safeParse(payload)

  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: result.error.flatten() },
      { status: 422 }
    )
  }

  try {
    await insertCreatorListSubmission(result.data)
  } catch (error) {
    console.error('Failed to insert creator list submission', error)

    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
