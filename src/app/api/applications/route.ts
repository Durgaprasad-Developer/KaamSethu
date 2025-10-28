// app/api/applications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { createApplication, getWorkerByUserId, getApplicationsByWorker, getApplicationsByJob } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.userType !== 'worker') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { jobId, message, proposedRate } = body;

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const worker = await getWorkerByUserId(session.id);
    if (!worker) {
      return NextResponse.json({ error: 'Worker profile not found' }, { status: 404 });
    }

    const application = await createApplication({
      jobId: parseInt(jobId),
      workerId: worker.id,
      message,
      proposedRate: proposedRate ? parseInt(proposedRate) : undefined,
    });

    return NextResponse.json({ application });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const jobId = searchParams.get('jobId');

    if (session.userType === 'worker') {
      const worker = await getWorkerByUserId(session.id);
      if (!worker) {
        return NextResponse.json({ error: 'Worker profile not found' }, { status: 404 });
      }
      
      const applications = await getApplicationsByWorker(worker.id);
      return NextResponse.json({ applications });
    } else if (session.userType === 'employer' && jobId) {
      const applications = await getApplicationsByJob(parseInt(jobId));
      return NextResponse.json({ applications });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}