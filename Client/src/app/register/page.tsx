import { Button } from "@/components/button";
import { FloatingInput, Input } from "@/components/input";
import { TypographyH1, TypographyH2, TypographyP } from "@/components/typography";
import Image from "next/image";

export default function LoginPage () {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 w-full mx-auto bg-zinc-100">
        <Image src="/logo.png" width={100} height={100} alt={'Logo'} />

        <div
        className={'mt-10 max-w-md w-full border border-gray-200 rounded-lg p-8 flex flex-col bg-white'}
        >
            <TypographyH2>Register</TypographyH2>
            <TypographyP className="text-gray-500">Create an account</TypographyP>

            <form className="flex flex-col items-center gap-6 w-full mt-8">

                <div className={'flex items-center gap-6 w-full'}>
                    <FloatingInput
                    type={'text'}
                    label="First Name"
                    />
                    <FloatingInput
                    type={'text'}
                    label="Last Name"
                    />
                </div>
                <FloatingInput
                type={'text'}
                label="Email"
                />
                <FloatingInput
                type={'password'}
                label="Password"
                />
                
                <div 
                className={'w-full flex flex-col items-center gap-3'}
                >
                    <Button className="mt-4 w-full">Register</Button>
                    <TypographyP className="text-gray-500">Already have an account? <a href="/login" className="text-black">Login</a></TypographyP>
                </div>
                
            </form>
        </div>
        
        </main>
    )
}