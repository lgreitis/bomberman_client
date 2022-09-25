import "./style.css";
import Game from "./classes/game";
import axios from "axios";
import { baseURL } from "./constants";

const loginButton = document.getElementById("login-button");

interface Player {
  Username: string;
  PositionX: number;
  PositionY: number;
}

const startGame = () => {
  const socket = new WebSocket("wss://ff1d-87-247-67-226.ngrok.io/Game");
  const token = localStorage.getItem("token");
  const game = new Game(800, 600);
  const app = document.getElementById("app");
  app?.appendChild(game.app.view);

  socket.addEventListener("open", () => {
    socket.send(`LOGIN;${token}`);
  });

  socket.addEventListener("message", (event) => {
    const data: { Type: string } = JSON.parse(event.data);
    switch (data.Type) {
      case "LOGIN": {
        socket.send(`GETGAME`);
        break;
      }
      case "PLAYERS": {
        game.removePlayers();

        const parsedData = data as { Type: string; Players: Player[] };

        parsedData.Players.forEach((player) => {
          game.addPlayer(player.Username, player.PositionX, player.PositionY);
        });
      }
    }
  });
};

const init = () => {
  const token = localStorage.getItem("token");

  if (token) {
    document.getElementById("login-wrapper")?.classList.add("hidden");
    startGame();
    return;
  }

  loginButton?.addEventListener("click", async () => {
    const username = (<HTMLInputElement>document.getElementById("username"))
      .value;
    if (!username) {
      console.log("no username!");
      return;
    }

    const res = await axios.post(baseURL + "/auth/login", { username });

    localStorage.setItem("token", res.data.token);

    document.getElementById("login-wrapper")?.classList.add("hidden");
    startGame();
  });
};

init();
