import Button from "@/components/Button";
import ChessBoard from "@/components/ChessBoard";
import React from "react";

const Game = () => {
  return (
    <div>
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 bg-red-200 w-full">
            <ChessBoard />
          </div>
          <div className="col-span-2 bg-gray-200 w-full">
            <Button>Play</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
