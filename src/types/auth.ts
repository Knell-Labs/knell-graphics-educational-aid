
export type UserTypes = {
    email   : string;
    username: string;
    password: string;
};

export type LoginFormTypes = UserTypes;

export type SignUpFormTypes = UserTypes & {
    email?: string;
    confirmPassword?: string;
};

export interface UserProfile {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    // ... add other profile fields as required
}

import { Session } from '@supabase/auth-helpers-nextjs';
export interface AuthContextType {
    session: Session | null;
    profile: UserProfile | null;
    loading: boolean;
    getProfile: () => void;
    // Add any other utility functions or states as required
}