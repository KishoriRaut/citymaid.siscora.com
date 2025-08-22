import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
<<<<<<< HEAD
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
=======
    
    try {
      // Exchange the code for a session
      const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (sessionError) {
        console.error('Error exchanging code for session:', sessionError);
        throw sessionError;
      }
      
      if (!session?.user) {
        throw new Error('No user in session');
      }
      
      // Get the user's email from the session
      const userEmail = session.user.email;
      if (!userEmail) {
        throw new Error('No email in user session');
      }
      
      // Determine the role - check in this order:
      // 1. State parameter (for OAuth - most reliable)
      // 2. URL parameter (for email signup)
      // 3. User metadata (from auth.signUp options)
      // 4. Default to 'employer' as fallback
      let role: 'maid' | 'employer' = 'employer';
      
      // 1. First check state parameter (for OAuth)
      const state = request.nextUrl.searchParams.get('state');
      if (state && state.startsWith('role_')) {
        const roleFromState = state.split('_')[1];
        if (roleFromState === 'maid' || roleFromState === 'employer') {
          role = roleFromState;
          console.log('Using role from state parameter:', role);
        }
      }
      // 2. If no state, check URL parameter (for email signup)
      else {
        const roleFromUrl = requestUrl.searchParams.get('role');
        if (roleFromUrl === 'maid' || roleFromUrl === 'employer') {
          role = roleFromUrl;
          console.log('Using role from URL parameter:', role);
        }
        // 3. If no URL param, check user metadata
        else if (session.user.user_metadata?.role) {
          const roleFromMetadata = session.user.user_metadata.role;
          if (roleFromMetadata === 'maid' || roleFromMetadata === 'employer') {
            role = roleFromMetadata;
            console.log('Using role from user metadata:', role);
          }
        }
      }
      
      console.log('Final role being set:', role);
      
      // First, get the current profile to check if we need to update the role
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('role, created_at')
        .eq('id', session.user.id)
        .single();
      
      // Only update if the role is different or if the profile doesn't exist
      const shouldUpdateRole = !existingProfile || existingProfile.role !== role;
      
      console.log('Current role in DB:', existingProfile?.role, 'New role:', role, 'Should update:', shouldUpdateRole);
      
      const now = new Date().toISOString();
      
      // Update or create user profile with role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          email: userEmail,
          full_name: session.user.user_metadata?.full_name || '',
          role: role,
          updated_at: now,
          created_at: existingProfile?.created_at || now,
        }, {
          onConflict: 'id',
          ignoreDuplicates: false
        })
        .select()
        .single();
        
      if (profileError) {
        console.error('Error updating profile:', profileError);
        throw new Error('Failed to update user profile');
      }
      
      console.log('Profile updated successfully:', profile);
      
      // Redirect based on role
      const redirectUrl = new URL(
        `/${role === 'maid' ? 'maid' : 'employer'}/dashboard`, 
        request.url
      );
      
      console.log('Redirecting to:', redirectUrl.toString());
      return NextResponse.redirect(redirectUrl);
      
    } catch (error) {
      console.error('Error in auth callback:', error);
      // Redirect to login with error message
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('error', 'Failed to complete sign in. Please try again.');
      return NextResponse.redirect(loginUrl);
    }
  }

  // If no code, redirect to home with error
  const homeUrl = new URL('/', request.url);
  homeUrl.searchParams.set('error', 'Invalid authentication code');
  return NextResponse.redirect(homeUrl);
>>>>>>> work-aug22
}
