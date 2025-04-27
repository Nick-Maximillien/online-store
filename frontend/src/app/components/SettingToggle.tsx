"use client"

import { useState } from "react"
import Settings from "./Settings"

export default function SettingToggle() {
    let [isOpen, setIsOpen] = useState(false)
    return (
        <div>
        <button onClick={() => setIsOpen(true)}>Settings</button>
        {isOpen && <Settings />}
        </div>
    )
}