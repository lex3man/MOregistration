'use client';

import { Complete } from "@/components/finish";
import { RegForm } from "@/components/reg-form";
import { useState } from "react";

export default function Home() {
  const [complete, setComplete] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="items-center justify-center space-y-16 sm:space-y-0">
          <h2 className="text-center text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-6xl">
            Регистрация
          </h2>
        </div>
        <div className="mt-16 flex flex-col items-center justify-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8">
          {complete ? (<Complete />) : (<RegForm completeSetter={setComplete} />)}
        </div>
      </main>
    </div>
  );
}
