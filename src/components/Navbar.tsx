'use client'

import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

import './nav.css'
import Link from "next/link";

export default function Navbar() {
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
                        <button className='sign-in'> Sign in to Wachly </button>
                    </SignInButton>
                </SignedOut>
            </ul>
        </nav>
      </>
    );
  }
  