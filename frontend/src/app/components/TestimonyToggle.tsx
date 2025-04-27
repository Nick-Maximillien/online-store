"use client"

import { useState } from "react"
import Testimonials from "../components/Testimonials"

export default function TestimonyToggle() {
    let [isOpen, setIsOpen] = useState(false)
    return (
        <div>
        <button onClick={() => setIsOpen(true)}>What our customers say</button>
        {isOpen && <Testimonials />}
        </div>
    )
}