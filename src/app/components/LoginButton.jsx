"use client"
import React from 'react';
import { signIn } from "next-auth/react"
const LoginButton = () => {
    return (
        <div>
            <button className="cursor-pointer" onClick={() => signIn()}>Login</button>
        </div>
    );
};

export default LoginButton;