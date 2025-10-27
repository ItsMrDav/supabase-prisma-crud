import { createClient } from '@/lib/supabase/client'; // connect to Supabase in browser
import { useEffect, useState } from 'react';

export const useCurrentUserImage = () => {
  // This custom React Hook gets the current user's profile image
  const [image, setImage] = useState<string | null>(null); // 🔹 Store the user's image URL in state

  useEffect(() => {
    // 🔹 Run code when the component first loads
    const fetchUserImage = async () => {
      const { data, error } = await createClient().auth.getSession(); // ask Supabase for current session
      if (error) {
        console.error(error);
      }
      setImage(data.session?.user.user_metadata.avatar_url ?? null); // Grab the avatar image URL from the user's metadata
    };
    fetchUserImage();
  }, []);

  return image; // 🔹 Return the image URL to whoever uses this hook
};
