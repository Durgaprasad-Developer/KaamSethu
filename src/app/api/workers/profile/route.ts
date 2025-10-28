// app/api/workers/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { createWorker, updateWorker, getWorkerByUserId } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.userType !== 'worker') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, skill, experience, location, languages, hourlyRate, dailyRate, bio } = body;

    if (!name || !skill || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if worker profile already exists
    const existingWorker = await getWorkerByUserId(session.id);
    
    let worker;
    if (existingWorker) {
      // Update existing profile
      worker = await updateWorker(existingWorker.id, {
        name,
        skill,
        experience,
        location,
        languages: languages || [],
        hourlyRate,
        dailyRate,
        bio,
        updatedAt: new Date(),
      });
    } else {
      // Create new worker profile
      worker = await createWorker({
        userId: session.id,
        name,
        skill,
        experience,
        location,
        languages: languages || [],
        hourlyRate: hourlyRate || 500,
        dailyRate: dailyRate || 3000,
        bio,
      });
    }

    return NextResponse.json({ worker });
  } catch (error) {
    console.error('Error creating/updating worker profile:', error);
    return NextResponse.json({ error: 'Failed to save worker profile' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.userType !== 'worker') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const worker = await getWorkerByUserId(session.id);
    
    if (!worker) {
      return NextResponse.json({ error: 'Worker profile not found' }, { status: 404 });
    }

    return NextResponse.json({ worker });
  } catch (error) {
    console.error('Error fetching worker profile:', error);
    return NextResponse.json({ error: 'Failed to fetch worker profile' }, { status: 500 });
  }
}