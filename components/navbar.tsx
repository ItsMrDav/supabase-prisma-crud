// ***********************************************************************************
// ******************** MAKING LOGIN OPENS IN A MODAL ********************************
// ***********************************************************************************
// FLICKER PROFILE MENU UPDATA with using server wrapper = NavbarWrapper component
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import LoginModal from '@/components/login-modal';
import type { User } from '@supabase/supabase-js';
import ProfileMenu from '@/components/profile-menu';
import Link from 'next/link';

export default function Navbar({ initialUser }: { initialUser: User | null }) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(initialUser);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link className="text-3xl font-bold" href="/">
          Test App
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <Button onClick={() => setOpen(true)}>Log In</Button>
          )}
        </div>
      </div>

      <LoginModal open={open} onOpenChange={setOpen} />
    </nav>
  );
}
