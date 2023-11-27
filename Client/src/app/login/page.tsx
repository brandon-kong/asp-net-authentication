'use client';

import { useState } from "react";

import { Button } from "@/components/button";
import { FloatingInput, Input } from "@/components/input";
import { TypographyH1, TypographyH2, TypographyP } from "@/components/typography";
import Image from "next/image";

import { login } from "@/lib/authentication";

import { signIn } from "next-auth/react";

export default function LoginPage () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signIn('email-password', {
            email,
            password,
            callbackUrl: '/',
            redirect: false
        })
        .then((res) => {
            if (res && !res.ok) {
                alert('Error logging in');
            }
            else {
                window.location.href = '/';
            }
        })
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 w-full mx-auto bg-zinc-100">
        <Image src="/logo.png" width={100} height={100} alt={'Logo'} />

        <div
        className={'mt-10 max-w-md w-full border border-gray-200 rounded-lg p-8 flex flex-col bg-white'}
        >
            <TypographyH2>Login</TypographyH2>
            <TypographyP className="text-gray-500">Login to your account</TypographyP>

            <form onSubmit={handleLogin} className="flex flex-col items-center gap-6 w-full mt-8">
                <FloatingInput
                type={'text'}
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <FloatingInput
                type={'password'}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                
                <div 
                className={'w-full flex flex-col items-center gap-3'}
                >
                    <Button className="mt-4 w-full" type={'submit'}>Login</Button>
                    <TypographyP className="text-gray-500">Don&apos;t have an account? <a href="/register" className="text-black">Register</a></TypographyP>
                </div>
                
            </form>
        </div>
        
        </main>
    )
}