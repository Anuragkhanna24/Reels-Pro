"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";
import { SlideToConfirm } from "@/app/components/lightswind/slide-to-confirm";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();

  const loginUser = async (): Promise<boolean> => {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    showNotification(result.error, "error");
    return false;
  }

  showNotification("Login successful!", "success");
  router.push("/");
  return true;
};

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  await loginUser();
};

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-base-content">
              Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input input-bordered input-sm sm:input-md"
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input input-bordered input-sm sm:input-md"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-center py-12">
     <SlideToConfirm
  text="Slide to Login"
  successText="Logged In"
  onConfirm={loginUser}
/>
    </div>
              <p className="text-center text-sm text-base-content/70 mt-4">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="link link-primary font-semibold"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
