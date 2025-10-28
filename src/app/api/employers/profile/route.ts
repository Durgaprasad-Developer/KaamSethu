// app/api/employers/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { createEmployer, getEmployerByUserId } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.userType !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, companyName, location, latitude, longitude } = body;

    if (!name || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if employer profile already exists
    const existingEmployer = await getEmployerByUserId(session.id);
    
    if (existingEmployer) {
      return NextResponse.json({ error: 'Employer profile already exists' }, { status: 409 });
    }

    const employer = await createEmployer({
      userId: session.id,
      name,
      companyName,
      location,
      latitude,
      longitude,
    });

    return NextResponse.json({ employer });
  } catch (error) {
    console.error('Error creating employer profile:', error);
    return NextResponse.json({ error: 'Failed to create employer profile' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.userType !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const employer = await getEmployerByUserId(session.id);
    
    if (!employer) {
      return NextResponse.json({ error: 'Employer profile not found' }, { status: 404 });
    }

    return NextResponse.json({ employer });
  } catch (error) {
    console.error('Error fetching employer profile:', error);
    return NextResponse.json({ error: 'Failed to fetch employer profile' }, { status: 500 });
  }
}