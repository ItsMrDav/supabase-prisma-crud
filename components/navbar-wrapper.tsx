import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/navbar';

export default async function NavbarWrapper() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user ?? null;

  // Pass initial user to the client navbar
  return <Navbar initialUser={user} />;
}
