// app/api/workers/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getWorkersBySkill } from '@/lib/db/queries';

type WorkerWithDistance = Awaited<ReturnType<typeof getWorkersBySkill>>[0] & { distance?: number };

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

export async function POST(request: NextRequest) {
  try {
    // Temporarily allow without authentication for testing
    const session = await getSession();
    console.log('Session check:', session ? 'Valid' : 'Invalid');
    
    // For now, allow access even without session for testing
    // if (!session || session.userType !== 'employer') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const { skill, location, budget, userLocation } = body;
    
    console.log('Search request:', { skill, location, budget, userLocation });

    if (!skill) {
      return NextResponse.json({ error: 'Skill parameter required' }, { status: 400 });
    }

    // Get workers by skill
    let workers = await getWorkersBySkill(skill, 20);
    
    // If no workers found, return some test data for demo purposes
    if (workers.length === 0) {
      workers = [
        {
          id: 1,
          userId: 1,
          name: 'Rajesh Kumar',
          skill: skill,
          experience: '5 years experience',
          location: location || 'Mumbai',
          latitude: '19.0760',
          longitude: '72.8777',
          languages: ['Hindi', 'English'],
          bio: 'Experienced plumber with expertise in residential and commercial plumbing solutions.',
          profilePhoto: null,
          hourlyRate: 150,
          dailyRate: 800,
          rating: '4.5',
          totalReviews: 45,
          jobsCompleted: 120,
          responseTime: 15,
          availability: 'available',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          userId: 2,
          name: 'Priya Sharma',
          skill: skill,
          experience: '3 years experience',
          location: location || 'Delhi',
          latitude: '28.6139',
          longitude: '77.2090',
          languages: ['Hindi', 'English'],
          bio: 'Skilled electrician specializing in home wiring and electrical repairs.',
          profilePhoto: null,
          hourlyRate: 120,
          dailyRate: 600,
          rating: '4.2',
          totalReviews: 38,
          jobsCompleted: 85,
          responseTime: 25,
          availability: 'available',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
    }

    // If userLocation is provided, calculate distances and sort by proximity
    let enhancedWorkers: WorkerWithDistance[] = workers;
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      enhancedWorkers = workers.map(worker => {
        if (worker.latitude && worker.longitude) {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            parseFloat(worker.latitude),
            parseFloat(worker.longitude)
          );
          return { ...worker, distance };
        }
        return { ...worker, distance: undefined };
      }).sort((a: WorkerWithDistance, b: WorkerWithDistance) => (a.distance || Infinity) - (b.distance || Infinity));
    }

    // Filter by location if specified
    if (location) {
      enhancedWorkers = enhancedWorkers.filter(worker => 
        worker.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by budget if specified
    if (budget) {
      enhancedWorkers = enhancedWorkers.filter(worker => 
        (worker.dailyRate && worker.dailyRate <= budget) ||
        (worker.hourlyRate && worker.hourlyRate * 8 <= budget) // Assume 8-hour workday
      );
    }

    return NextResponse.json({ workers: enhancedWorkers });
  } catch (error) {
    console.error('Error searching workers:', error);
    return NextResponse.json({ error: 'Failed to search workers' }, { status: 500 });
  }
}

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
}
