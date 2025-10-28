// app/api/verifications/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { updateVerification } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { upiVerified, upiId, ngoVerified } = body;

    const data: Record<string, unknown> = {};
    if (upiVerified !== undefined) data.upiVerified = upiVerified;
    if (upiId) data.upiId = upiId;
    if (ngoVerified !== undefined) data.ngoVerified = ngoVerified;

    const verification = await updateVerification(session.id, data);

    return NextResponse.json({ verification });
  } catch (error) {
    console.error('Error updating verification:', error);
    return NextResponse.json({ error: 'Failed to update verification' }, { status: 500 });
  }
}
