// app/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      <p>Phone: {user.phone}</p>
      <p>User ID: {user.id}</p>
      
      <form action="/api/auth/signout" method="post">
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
