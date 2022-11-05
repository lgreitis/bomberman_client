import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Lobby } from '../../types';
import { lobbyService } from './lobby.service';

const ButtonStyle = css`
  padding: 8px;
  margin: 4px 0px;
  background: #939393;
  border-radius: 5px;
  transition: background 0.2s;
  text-align: center;

  :hover {
    cursor: pointer;
    background: #ababab;
  }
`;

interface Props {
  onJoin: (lobbyId: number) => void;
}

const LobbyView = (props: Props) => {
  const { onJoin } = props;
  const [lobbies, setLobbies] = useState<Lobby[]>([]);

  useEffect(() => {
    lobbyService.getLobbies().then((res) => {
      setLobbies(res.data.lobbies);
    });
  }, []);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}>
      <h1>Join a lobby</h1>
      {lobbies.map((el, i) => {
        if (el.isFull) {
          return null;
        }
        return (
          <div
            key={i}
            css={ButtonStyle}
            onClick={() => {
              onJoin(el.lobbyId);
            }}>
            <div>Lobby {el.lobbyId}</div>
          </div>
        );
      })}
      <div
        css={[
          ButtonStyle,
          css`
            margin-top: 40px;
          `,
        ]}
        onClick={() => {
          lobbyService.createLobby().then((res) => {
            onJoin(res.data.lobbyId);
          });
        }}>
        Create lobby
      </div>
    </div>
  );
};

export default LobbyView;
