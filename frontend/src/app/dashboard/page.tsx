"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@utils/useAuth";
import Link from "next/link";
import Counter from "../components/Counter";
import SettingToggle from "../components/SettingToggle";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!useAuth()) {
      router.push("/");
    } else {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);

  return (
    <div className="container">
      {user ? (
        <div>
          <h1>Welcome {user.username} !</h1>
          <p>Would you like to go <Link href={"/products"}>Shopping</Link></p>
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <button onClick={() => { localStorage.clear(); router.push("/"); }}>
            Logout
          </button>
          <SettingToggle />
          <Counter />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
