// app/api/workers/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getWorkersBySkill } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.userType !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const skill = searchParams.get('skill');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!skill) {
      return NextResponse.json({ error: 'Skill parameter required' }, { status: 400 });
    }

    const workers = await getWorkersBySkill(skill, limit);

    return NextResponse.json({ workers });
  } catch (error) {
    console.error('Error searching workers:', error);
    return NextResponse.json({ error: 'Failed to search workers' }, { status: 500 });
  }
}
