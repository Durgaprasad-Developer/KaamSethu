// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { createReview, getWorkerByUserId, getEmployerByUserId } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { jobId, revieweeId, rating, comment } = body;

    if (!jobId || !revieweeId || !rating) {
      return NextResponse.json({ error: 'Job ID, reviewee ID, and rating are required' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    // Determine reviewer based on user type
    let reviewerId: number;
    if (session.userType === 'worker') {
      const worker = await getWorkerByUserId(session.id);
      if (!worker) {
        return NextResponse.json({ error: 'Worker profile not found' }, { status: 404 });
      }
      reviewerId = worker.id;
    } else if (session.userType === 'employer') {
      const employer = await getEmployerByUserId(session.id);
      if (!employer) {
        return NextResponse.json({ error: 'Employer profile not found' }, { status: 404 });
      }
      reviewerId = employer.id;
    } else {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    const review = await createReview({
      jobId: parseInt(jobId),
      reviewerId,
      revieweeId: parseInt(revieweeId),
      rating: parseInt(rating),
      comment,
    });

    return NextResponse.json({ review });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}