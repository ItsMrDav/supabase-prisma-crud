// FLICKER PROFILE MENU UPDATA
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CurrentUserAvatar } from '@/components/current-user-avatar';
import { LogoutButton } from '@/components/logout-button';
import type { User } from '@supabase/supabase-js';

export default function ProfileMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="focus:outline-none rounded-full overflow-hidden h-9 w-9"
          aria-label="User menu"
        >
          <CurrentUserAvatar />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52" sideOffset={8}>
        <DropdownMenuLabel className="text-sm">
          Signed in as
          <div className="font-medium truncate">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
