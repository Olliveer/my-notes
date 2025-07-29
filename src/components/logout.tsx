"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "@/server/auth-user";
import { useRouter } from "next/navigation";
import { LoaderIcon, LogOutIcon } from "lucide-react";

export default function Logout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut();
      router.push("/");
    } catch (error) {
      console.log("signOut error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button onClick={logout} size="icon" variant="ghost">
      {isLoading ? (
        <LoaderIcon className="size-4 animate-spin" />
      ) : (
        <LogOutIcon className="size-4" />
      )}
    </Button>
  );
}
