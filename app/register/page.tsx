"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";
import {SlideToConfirm} from "@/app/components/lightswind/slide-to-confirm";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     showNotification("Passwords do not match", "error");
  //     return;
  //   }

  //   try {
  //     const res = await fetch("/api/auth/register", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.error || "Registration failed");
  //     }

  //     showNotification("Registration successful! Please log in.", "success");
  //     router.push("/login");
  //   } catch (error) {
  //     showNotification(
  //       error instanceof Error ? error.message : "Registration failed",
  //       "error",
  //     );
  //   }
  // };


  const registerUser = async (): Promise<boolean> => {
  if (password !== confirmPassword) {
    showNotification("Passwords do not match", "error");
    return false;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      showNotification(
        data.error || "Registration failed",
        "error"
      );
      return false;
    }

    showNotification(
      "Registration successful! Please log in.",
      "success"
    );

    router.push("/login");
    return true;
  } catch (error) {
    showNotification(
      error instanceof Error
        ? error.message
        : "Registration failed",
      "error"
    );

    return false;
  }
};

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  await registerUser();
};

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-base-content">
              Register
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
              <div className="form-control">
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input input-bordered input-sm sm:input-md"
                  placeholder="••••••••"
                />
              </div>
             <div className="flex justify-center py-6">
  <SlideToConfirm
    text="Slide to Register"
    successText="Registered"
    onConfirm={registerUser}
  />
</div>
              <p className="text-center text-sm text-base-content/70 mt-4">
                Already have an account?{" "}
                <Link href="/login" className="link link-primary font-semibold">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
