// app/api/payments/release/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { releasePayment } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.userType !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { paymentId } = body;

    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID required' }, { status: 400 });
    }

    const payment = await releasePayment(paymentId);

    return NextResponse.json({ payment, message: 'Payment released successfully' });
  } catch (error) {
    console.error('Error releasing payment:', error);
    return NextResponse.json({ error: 'Failed to release payment' }, { status: 500 });
  }
}
