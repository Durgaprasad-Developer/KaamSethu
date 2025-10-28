// lib/auth/session.ts - Session management helpers
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { getUserByPhone, getWorkerByUserId, getEmployerByUserId } from "../db/queries";

export type SessionUser = {
  id: number;
  phone: string;
  userType: 'worker' | 'employer';
  profileId: number;
  name: string;
};

export async function getSession(): Promise<SessionUser | null> {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }
  
  // Get user from our database
  const dbUser = await getUserByPhone(user.phone || '');
  if (!dbUser) {
    return null;
  }
  
  // Get profile based on user type
  let profileId = 0;
  let name = '';
  
  if (dbUser.userType === 'worker') {
    const worker = await getWorkerByUserId(dbUser.id);
    if (worker) {
      profileId = worker.id;
      name = worker.name;
    }
  } else {
    const employer = await getEmployerByUserId(dbUser.id);
    if (employer) {
      profileId = employer.id;
      name = employer.name;
    }
  }
  
  return {
    id: dbUser.id,
    phone: dbUser.phone,
    userType: dbUser.userType as 'worker' | 'employer',
    profileId,
    name,
  };
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function requireWorkerAuth() {
  const session = await requireAuth();
  if (session.userType !== 'worker') {
    throw new Error('Worker authentication required');
  }
  return session;
}

export async function requireEmployerAuth() {
  const session = await requireAuth();
  if (session.userType !== 'employer') {
    throw new Error('Employer authentication required');
  }
  return session;
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
