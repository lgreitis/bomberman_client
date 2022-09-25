import { css } from "@emotion/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { WS_URL } from "../constants";
import { selectUser } from "../features/auth/userSlice";
import Game from "../game/classes/game";

const GamePage = () => {
  const user = useSelector(selectUser);

  useEffect(() => {
    const gameDiv = document.getElementById("game");
    if (gameDiv) {
      const socket = new WebSocket(WS_URL);
      socket.addEventListener("open", () => {
        console.log("hello");
        const game = new Game(800, 600, socket, user.username);
        gameDiv.appendChild(game.app.view);
      });
    }

    return () => {
      if (gameDiv) {
        gameDiv.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      <div
        id="game"
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      ></div>
    </>
  );
};

export default GamePage;
