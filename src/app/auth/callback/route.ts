import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    
    // Get the user and their role
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Check if we have a role from signup (stored in localStorage)
      const signupRole = request.nextUrl.searchParams.get('state')?.split('_')[1];
      const role = signupRole || 'employer'; // Default to employer if no role found
      
      // Update or create user profile with role
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          role,
          updated_at: new Date().toISOString(),
        });
      
      // Redirect based on role
      return NextResponse.redirect(
        new URL(`/${role === 'maid' ? 'maid' : 'employer'}/dashboard`, request.url)
      );
    }
  }

  // If there's an error or no code, redirect to home
  return NextResponse.redirect(new URL('/', request.url));
}
