"use client";
import Image from "next/image";
import React from "react";
import chess from "../assets/chess.png";
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex mx-40 my-20 gap-10">
        <Image src={chess} height={500} width={500} alt="image" />
        <div className="flex flex-col items-center gap-4 mt-10">
          <h1 className="font-bold text-5xl w-[450px] text-wrap text-center">
            Play Chess Online on the #1 Site!
          </h1>

          <button
            className="p-10 bg-green-500 hover:bg-green-700 rounded-2xl font-semibold text-2xl"
            onClick={() => router.push("game")}
          >
            Play Online
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
