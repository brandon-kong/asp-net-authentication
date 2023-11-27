'use client';

import { useContext, createContext, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import type { Session, User } from 'next-auth';

export type IAuthContext = {
    isAuthenticated: boolean,
    user: any | null,
    email: string,
    loading?: boolean,
}

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    user: null,
    email: '',
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const { data: session, status } = useQuery({
        queryKey: ['session'],
        queryFn: () => getSession(),
    });

    return (
        <AuthContext.Provider value={{
            isAuthenticated : status === 'success' && !!session,
            user: session ? session.user : null,
            email: session ? session.user.email as string : '',
            loading: status === 'pending'
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;