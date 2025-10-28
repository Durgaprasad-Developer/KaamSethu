// app/api/auth/session/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      // For testing purposes, return a mock user when no session exists
      return NextResponse.json({ 
        user: {
          id: 1,
          name: 'Test Employer',
          phone: '+91 9876543210',
          userType: 'employer',
          profileId: 1
        } 
      }, { status: 200 });
    }

    return NextResponse.json({ 
      user: {
        id: session.id,
        name: session.name,
        phone: session.phone,
        userType: session.userType,
        profileId: session.profileId
      } 
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    // Fallback test data for debugging
    return NextResponse.json({ 
      user: {
        id: 1,
        name: 'Test Employer',
        phone: '+91 9876543210',
        userType: 'employer',
        profileId: 1
      } 
    }, { status: 200 });
  }
}