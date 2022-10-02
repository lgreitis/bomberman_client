import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GAME_WS_URL } from "../constants";
import { selectUser } from "../features/auth/userSlice";
import { lobbyService } from "../features/lobby/lobby.service";
import LobbyView from "../features/lobby/LobbyView";
import { Lobby } from "../types";
import Game from "../_game/classes/game";
import SocketHandler from "../_game/classes/socketHandler";

const GamePage = () => {
  const user = useSelector(selectUser);
  const [lobby, setLobby] = useState<number | undefined>();
  const [connectionLobby, setConnectionLobby] = useState<number | undefined>();
  const [socketHandler, setSocketHandler] = useState(
    new SocketHandler(user.token)
  );

  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    // let joined = false;
    socketHandler.socket.addEventListener("open", () => {
      socketHandler.onStart((lobbyId) => {
        setConnectionLobby(lobbyId);
        // console.log("STARTED!!!", lobbyId, lobby, joined);
        // if (lobbyId === lobby && !joined) {
        //   joined = true;
        //   socketHandler.connectToGameWs();
        //   const game = new Game(800, 600, user.username, socketHandler);
        //   gameDiv.appendChild(game.app.view);
        // }
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
        const game = new Game(800, 600, user.username, socketHandler, lobby);
        gameDiv.appendChild(game.app.view);
      });
    }
  }, [lobby, connectionLobby]);

  return (
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
  );
};

export default GamePage;
