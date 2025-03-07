import { MOVE } from "@/app/(screens)/game/page";
import { Color, PieceSymbol, Square } from "chess.js";
import Image from "next/image";
import React, { useState } from "react";

const ChessBoard = ({
  borad,
  setBoard,
  chess,
  socket,
}: {
  borad: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  setBoard: any;
  chess: any;
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);

  return (
    <div className="text-black">
      {borad.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresention = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
              return (
                <div
                  key={j}
                  className={`w-20 h-20 ${(i + j) % 2 === 0 ? "bg-[#83b34d]" : "bg-[#eaead4]"}`}
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresention);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresention,
                            },
                          },
                        })
                      );

                      setFrom(null);
                      console.log({
                        from,
                        to: squareRepresention,
                      });
                      chess.move({
                        from,
                        to: squareRepresention,
                      });
                      setBoard(chess.board());
                    }
                  }}
                >
                  <div className="flex justify-center h-full items-center">
                    {square && (
                      <Image
                        width={60}
                        height={60}
                        alt="square-image"
                        src={`/${square?.color === "b" ? `b${square?.type}` : `w${square?.type}`}.png`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
