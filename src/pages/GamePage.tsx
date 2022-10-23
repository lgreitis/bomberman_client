import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../common/Button";
import { SCALE } from "../constants";
import { logout, selectUser } from "../features/auth/userSlice";
import LobbyView from "../features/lobby/LobbyView";
import Game from "../_game/classes/game";
import SocketHandler from "../_game/classes/socketHandler";

const GamePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [lobby, setLobby] = useState<number | undefined>();
  const [connectionLobby, setConnectionLobby] = useState<number | undefined>();
  const [socketHandler, setSocketHandler] = useState(
    new SocketHandler(user.token)
  );

  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    socketHandler.socket.addEventListener("open", () => {
      socketHandler.onStart((lobbyId) => {
        setConnectionLobby(lobbyId);
      });
    });
  }, []);

  useEffect(() => {
    const gameDiv = document.getElementById("game");
    if (!gameDiv || !lobby || !connectionLobby) {
      return;
    }

    if (connectionLobby === lobby) {
      setStarted(true);
      socketHandler.connectToGameWs().then(() => {
        socketHandler.lobbyId = lobby;
        const game = new Game(
          SCALE * 32,
          SCALE * 24,
          user.username,
          socketHandler,
          lobby
        );
        gameDiv.appendChild(game.app.view);
      });
    }

    return () => {
      gameDiv.innerHTML = "";
    };
  }, [lobby, connectionLobby]);

  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: right;
          align-items: center;
          gap: 10px;
          padding: 5px;
        `}
      >
        <div
          css={css`
            font-size: large;
          `}
        >
          Username: {user.username}
        </div>
        <button
          css={Button}
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </button>
      </div>
      <div
        id="game"
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {!lobby && (
          <LobbyView
            onJoin={(lobbyId) => {
              setLobby(lobbyId);
              socketHandler.sendJoinCommand(lobbyId, user.token);
            }}
          />
        )}
        {lobby && !started && <h1>Waiting for players...</h1>}
      </div>
    </>
  );
};

export default GamePage;
