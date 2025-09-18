interface CreatorListSubmission {
  website: string
  workEmail: string
}

const CREATOR_LIST_TABLE = 'creator_list_requests'

export async function insertCreatorListSubmission(
  payload: CreatorListSubmission
): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL environment variable')
  }

  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${CREATOR_LIST_TABLE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      website: payload.website,
      work_email: payload.workEmail,
    }),
    cache: 'no-store',
    next: { revalidate: 0 },
  })

  if (!response.ok) {
    let errorDetails: unknown
    try {
      errorDetails = await response.json()
    } catch {
      errorDetails = { message: 'Failed to parse Supabase error response' }
    }

    throw new Error(
      `Failed to insert creator list submission: ${JSON.stringify(errorDetails)}`
    )
  }
}
