"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
};
