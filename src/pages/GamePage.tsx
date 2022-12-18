import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../common/Button';
import { SCALE } from '../constants';
import { logout, selectUser } from '../features/auth/userSlice';
import LobbyView from '../features/lobby/LobbyView';
import { ResponsePayload } from '../types';
import Game from '../_game/classes/game';
import SocketHandler, { SocketType } from '../_game/classes/socketHandler';

const GamePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [lobby, setLobby] = useState<number | undefined>();
  const [connectionLobby, setConnectionLobby] = useState<number | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socketHandler, setSocketHandler] = useState<SocketHandler | undefined>();
  const [messages, setMessages] = useState<string[]>([]);
  const [consoleText, setConsoleText] = useState<string>('');

  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    const socketHandler = new SocketHandler(user.token);
    setSocketHandler(socketHandler);

    socketHandler.socket.addEventListener('open', () => {
      socketHandler.onStart((lobbyId) => {
        setConnectionLobby(lobbyId);
      });
    });
  }, []);

  const [game, setGame] = useState<Game | undefined>(undefined);

  useEffect(() => {
    const gameDiv = document.getElementById('game');
    if (!gameDiv || !lobby || !connectionLobby || !socketHandler || started) {
      return;
    }

    if (connectionLobby !== lobby) {
      return;
    }

    setStarted(true);

    socketHandler.connectToGameWs().then(() => {
      socketHandler.lobbyId = lobby;
      const game = new Game(SCALE * 32, SCALE * 24, socketHandler, lobby);
      setGame(game);
      gameDiv.appendChild(game.app.view);

      socketHandler.socket.addEventListener('message', (event) => {
        const data: ResponsePayload = JSON.parse(event.data as string);
        switch (data.ResponseId) {
          case 'MessagesUpdate': {
            setMessages((prev) => prev.concat(data.Data as string[]));
          }
        }
      });
    });

    return () => {
      if (game) {
        game.destroy();
      }
      gameDiv.innerHTML = '';
    };
  }, [lobby, connectionLobby, socketHandler]);

  const handleSendCommand = () => {
    if (!socketHandler || socketHandler.socketType !== SocketType.Game || !consoleText) {
      console.log('return');
      return;
    }

    socketHandler.sendConsoleCommand(consoleText);
    setConsoleText('');
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: right;
          align-items: center;
          gap: 10px;
          padding: 5px;
        `}>
        <div
          css={css`
            font-size: large;
          `}>
          Username: {user.username}
        </div>
        <button
          css={Button}
          onClick={() => {
            dispatch(logout());
          }}>
          Logout
        </button>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}>
        <div
          id="game"
          css={css`
            display: flex;
            flex-grow: 1;
            justify-content: center;
            align-items: center;
          `}>
          {!lobby && (
            <LobbyView
              onJoin={(lobbyId) => {
                if (!socketHandler) {
                  return;
                }
                socketHandler.sendJoinCommand(lobbyId, user.token);
                setLobby(lobbyId);
              }}
            />
          )}
          {lobby && !started && <h1>Waiting for players...</h1>}
        </div>
        {lobby && started && (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              margin-right: 1px;
              flex-grow: 1;
              min-height: calc(100vh - 38px);
              max-height: calc(100vh - 38px);
              width: 100%;
              max-width: 350px;
            `}>
            <div
              css={css`
                border: 1px solid #333;
                border-right: none;
                overflow: scroll;
                display: flex;
                flex-grow: 1;
                flex-direction: column-reverse;
              `}>
              {[...messages].reverse().map((el, i) => (
                <div
                  key={i}
                  css={css`
                    width: 100%;
                    display: flex;
                    align-items: center;
                    min-height: 30px;
                    background: ${i % 2 ? '#555' : '#666'};
                  `}>
                  {el}
                </div>
              ))}
            </div>
            <div
              css={css`
                display: flex;
              `}>
              <input
                css={css`
                  width: 100%;
                  min-height: 30px;
                  padding: 0;
                  background: #666;
                  border: 1px solid #333;
                  border-top: none;
                  border-right: none;
                `}
                value={consoleText}
                onSubmit={() => {
                  handleSendCommand();
                }}
                onChange={(e) => {
                  setConsoleText(e.target.value);
                }}></input>
              <button onClick={() => handleSendCommand()}>Send</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GamePage;
