import "./style.css";
import Game from "./classes/game";
import axios from "axios";
import { baseURL } from "./constants";

const loginButton = document.getElementById("login-button");

const startGame = () => {
  const game = new Game(800, 600);

  const app = document.getElementById("app");
  app?.appendChild(game.app.view);

  game.addPlayer("player1");
  game.addPlayer("player2");
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

// init();

const socket = new WebSocket("wss://ff1d-87-247-67-226.ngrok.io/Game");

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});
