"use client";
import Button from "@/components/Button";
import ChessBoard from "@/components/ChessBoard";
import useSocket from "@/hooks/useSocket";
import { Chess } from "chess.js";
import React, { useEffect, useState } from "react";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          console.log("Game Initialized");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made");
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting....</div>;

  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 bg-transparent w-full flex justify-center">
            <ChessBoard
              borad={board}
              setBoard={setBoard}
              chess={chess}
              socket={socket}
            />
          </div>
          <div className="col-span-2 bg-[#eaead4] rounded-xl w-full flex justify-center items-center text-black font-bold text-5xl">
            <Button
              onClick={() =>
                socket.send(
                  JSON.stringify({
                    type: INIT_GAME,
                  })
                )
              }
            >
              Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
