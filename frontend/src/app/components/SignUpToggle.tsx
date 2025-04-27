"use client"

import { useState } from "react"
import SignupForm from "./SignUp"

export default function SignUpToggle() {
    let [isOpen, setIsOpen] = useState(false)
    return (
        <div className="signupbtn">
        <button onClick={() => setIsOpen(true)}>Signup</button>
        {isOpen && <SignupForm />}
        </div>
    )
}