'use client';

import { useContext, createContext, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import type { Session, User } from 'next-auth';

import { signOut } from 'next-auth/react';
import type { SignOutResponse, SignOutParams } from 'next-auth/react';

export type IAuthContext = {
    isAuthenticated: boolean,
    user: any | null,
    email: string,
    loading?: boolean,
    signOut: (a: SignOutParams<false>) => Promise<void>
}

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    user: null,
    email: '',
    loading: true,
    signOut: async (a: SignOutParams<false>) => {
        return signOut();
    }
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const { data: session, status, refetch } = useQuery({
        queryKey: ['session'],
        queryFn: () => getSession(),
    });

    const newSignOut = async (a: SignOutParams<false>) => {
       try {
            const response = await signOut(a);
            refetch()
       }
       catch(e) {
            return;
       }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated : status === 'success' && !!session,
            user: session ? session.user : null,
            email: session ? session.user.email as string : '',
            loading: status === 'pending',
            signOut: newSignOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;