"use client"

import Link from "next/link"
import { useState } from "react"

export default function Settings() {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className="settings">
            <p>Dark Mode</p>
            <p>Profile</p>
            <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
    )
}