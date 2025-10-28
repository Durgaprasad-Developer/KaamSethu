// app/api/jobs/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getJobsBySkill } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const skill = searchParams.get('skill');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!skill) {
      return NextResponse.json({ error: 'Skill parameter required' }, { status: 400 });
    }

    const jobs = await getJobsBySkill(skill, limit);

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error searching jobs:', error);
    return NextResponse.json({ error: 'Failed to search jobs' }, { status: 500 });
  }
}
