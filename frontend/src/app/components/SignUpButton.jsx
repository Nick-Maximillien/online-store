"use client"
import { useRouter } from "next/navigation";

const SignUpButton = () => {
    const router = useRouter();
  return (
      <div>
      <button onClick={() => router.push("/signup")}>Not a member? Sign up Today !</button>
    </div>
  );
};

export default SignUpButton;