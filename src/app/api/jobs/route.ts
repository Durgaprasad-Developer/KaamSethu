// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { createJob, getEmployerByUserId } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.userType !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, skill, description, location, budget, budgetType, startDate, duration, urgent } = body;

    if (!title || !skill || !description || !location || !budget) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const employer = await getEmployerByUserId(session.id);
    if (!employer) {
      return NextResponse.json({ error: 'Employer profile not found' }, { status: 404 });
    }

    const job = await createJob({
      employerId: employer.id,
      title,
      skill,
      description,
      location,
      budget: parseInt(budget),
      budgetType: budgetType || 'daily',
      startDate: startDate ? new Date(startDate) : undefined,
      duration,
      urgent: urgent || false,
    });

    return NextResponse.json({ job });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const skill = searchParams.get('skill');
    const location = searchParams.get('location');
    const limit = parseInt(searchParams.get('limit') || '20');

    // This would be a more advanced search function
    // For now, let's use the existing skill-based search
    if (skill) {
      const { getJobsBySkill } = await import('@/lib/db/queries');
      const jobs = await getJobsBySkill(skill, limit);
      return NextResponse.json({ jobs });
    }

    // Return empty array for now - you can implement general job listing later
    return NextResponse.json({ jobs: [] });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}