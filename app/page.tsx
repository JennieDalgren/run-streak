import { useEffect, useState } from "react";
import Image from "next/image";
import Calendar from "./components/Calendar";

export default function Home() {


  return (
    <div className="grid items-center justify-items-center min-h-screen p-1 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-6 mt-10 text-center text-gray-800">Run Streak! 🏃🏼‍♀️</h1>
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <Calendar />
      </main>
    </div>
  );
}
