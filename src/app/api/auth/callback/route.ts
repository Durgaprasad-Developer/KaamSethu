// app/api/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { getUserByPhone, createUser, updateUserLogin } from '@/lib/db/queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get('phone');
  const userType = searchParams.get('type') as 'worker' | 'employer';

  if (!phone || !userType) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check if user exists in our database
  let dbUser = await getUserByPhone(phone);
  
  if (!dbUser) {
    // Create new user in our database
    dbUser = await createUser(phone, userType, user.id);
  } else {
    // Update last login
    await updateUserLogin(dbUser.id);
  }

  // Redirect based on user type and profile status
  if (userType === 'worker') {
    return NextResponse.redirect(new URL('/worker/voice-intro', request.url));
  } else {
    return NextResponse.redirect(new URL('/employer/post-job', request.url));
  }
}
