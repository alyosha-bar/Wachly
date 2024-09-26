'use client'

import { SignedIn, SignedOut, UserButton, SignInButton, useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import './nav.css'
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Navbar() {

    const { isSignedIn, userId } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if(isSignedIn && userId) {

            const insertUser = async () => {
                try {
                    const res = await fetch('/api/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userId })
                    });

                    if(!res.ok) {
                        throw new Error('Failed to insert user')
                    }

                    console.log('User inserted or already exists.')
                    router.push('/')
                } catch (error) {
                    console.log(error)
                }
            }

            insertUser()
        }
    }, [isSignedIn, userId, router])


    return (
      <>
        <nav className="navbar">
            <h3 className="logo"> <Link  href='/'> Wachly </Link></h3>
            <ul className="navbar-links">
                <li className=""> <Link href='/' className="nav-link" > Home </Link> </li>
                <SignedIn> 
                    <li className=""> <Link href='/saved' className="nav-link" > Saved </Link> </li>
                    <div className="userbutton">
                        <UserButton />
                    </div>
                </SignedIn>
                <SignedOut> 
                    <SignInButton>
                        <button className='sign-in'> Sign In </button>
                    </SignInButton>
                </SignedOut>
            </ul>
        </nav>
      </>
    );
  }
  