import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./mesages";

const chess = new Chess();

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private startTime: Date;
  private moveCount = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = chess;
    this.startTime = new Date();

    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );

    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    if (this.moveCount % 2 == 0 && this.player1 !== socket) {
      // check for Even Count ..it should be player1, if player2 it's return;
      return;
    }
    if (this.moveCount % 2 == 1 && this.player2 !== socket) {
      return;
    }
    try {
      this.board.move(move);
    } catch (e) {
      console.log(e);
      return;
    }

    if (this.board.isGameOver()) {
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
          winner: this.board.turn() == "w" ? "black" : "white",
        })
      );
      this.player2.emit(
        JSON.stringify({
          type: GAME_OVER,
          winner: this.board.turn() == "w" ? "black" : "white",
        })
      );
      return;
    }

    if (this.moveCount % 2 == 0) {
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
    this.moveCount++;
  }
}
