import { supabase } from "@/supabase";
import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessage } from "element-plus";

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null);
    const session = ref(null);

    // Actions

    // Initialize the store
    const initialize = async () => {
        console.log('Initializing auth store');
        supabase.auth.getSession().then(({ data }) => {
          session.value = data.session;
        });
        supabase.auth.onAuthStateChange(async(_, _session) => {
            session.value = _session;
            user.value = _session?.user ?? null;
        });
    }

    // Sign up with email and password
    const signUp = async (email, password) => {
        try {
            console.log("Email: ", email);
            console.log("Password: ", password);
            const { user, session, error } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) {
                console.error('Error signing up:', error);
                return;
            }
            ElMessage.success('Signed up successfully');
            console.log('Signed up user:', user);
            session.value = session;
            user.value = user;
        } catch (error) {
            ElMessage.error('Error signing up');
            console.error('Error signing up:', error);
        }
    }

    // Sign in with GitHub
    const signInWithGithub = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github'
            });

            if (error) {
                console.error('Error signing in with GitHub:', error);
                return;
            }
            ElMessage.success('Signed in successfully');
            console.log('Signed in user:', data);
            session.value = data;
        } catch (error) {
            ElMessage.error('Error signing in with GitHub');
            console.error('Error signing in with GitHub:', error);
        }
    }

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google'
            });

            if (error) {
                console.error('Error signing in with Google:', error);
                return;
            }
            ElMessage.success('Signed in successfully');
            console.log('Signed in user:', data);
            session.value = data;
        } catch (error) {
            ElMessage.error('Error signing in with Google');
            console.error('Error signing in with Google:', error);
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error('Error signing out:', error);
                return;
            }
            ElMessage.success('Signed out successfully');
            console.log('Signed out user');
            user.value = null;
            session.value = null;
        } catch (error) {
            ElMessage.error('Error signing out');
            console.error('Error signing out:', error);
        }
    }

    // get user profile
    const getUserProfile = async () => {
        try { 
            const { data, error } = await supabase.from('profiles').select(`*`).eq('id', user.value.id).single();

            if (error) {
                console.error('Error getting user profile:', error);
                return;
            }
            console.log('User profile:', data);
            return data;
        } catch (error) {
            ElMessage.error('Error getting user profile');
            console.error('Error getting user profile:', error);
        }
    }

    // return the state and actions
    return {
        user,
        session,
        initialize,
        signUp,
        signInWithGithub,
        signInWithGoogle,
        signOut,
        getUserProfile
    };
});