// app/api/payments/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { createPayment, getEmployerByUserId } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.userType !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { jobId, payeeId, amount, paymentMethod } = body;

    if (!jobId || !payeeId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const employer = await getEmployerByUserId(session.id);
    if (!employer) {
      return NextResponse.json({ error: 'Employer profile not found' }, { status: 404 });
    }

    const payment = await createPayment({
      jobId,
      payerId: employer.id,
      payeeId,
      amount,
      paymentMethod: paymentMethod || 'upi',
    });

    return NextResponse.json({ payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
