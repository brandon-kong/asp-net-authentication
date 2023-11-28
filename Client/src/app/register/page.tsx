'use client';

import React, { useState } from "react";

import { Button } from "@/components/button";
import { FloatingInput, Input } from "@/components/input";
import { TypographyH1, TypographyH2, TypographyP } from "@/components/typography";
import Image from "next/image";

import { signIn } from "next-auth/react";
import axios from "axios";

export default function RegisterPage () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleRegister = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { status } = await axios.post('http://localhost:5058/api/v1/auth/register', {
                email,
                password,
                firstName,
                lastName
            });

            if (status === 200) {
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
            }
        }
        catch(e) {
            alert('Error registering')
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 w-full mx-auto bg-zinc-100">
        <Image src="/logo.png" width={100} height={100} alt={'Logo'} />

        <div
        className={'mt-10 max-w-md w-full border border-gray-200 rounded-lg p-8 flex flex-col bg-white'}
        >
            <TypographyH2>Register</TypographyH2>
            <TypographyP className="text-gray-500">Create an account</TypographyP>

            <form onSubmit={handleRegister} className="flex flex-col items-center gap-6 w-full mt-8">

                <div className={'flex items-center gap-6 w-full'}>
                    <FloatingInput
                    type={'text'}
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                    <FloatingInput
                    type={'text'}
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
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
                    <Button className="mt-4 w-full" type={'submit'}>Register</Button>
                    <TypographyP className="text-gray-500">Already have an account? <a href="/login" className="text-black">Login</a></TypographyP>
                </div>
                
            </form>
        </div>
        
        </main>
    )
}