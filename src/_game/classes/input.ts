import SocketHandler from "./socketHandler";

class Input {
  socket: SocketHandler;

  constructor(socket: SocketHandler) {
    this.socket = socket;

    document.onkeydown = (e) => {
      e = e || window.event;
      switch (e.key) {
        case "ArrowRight":
          this.socket.sendMoveCommand("ArrowRight");
          break;
        case "ArrowLeft":
          this.socket.sendMoveCommand("ArrowLeft");
          break;
        case "ArrowUp":
          this.socket.sendMoveCommand("ArrowUp");
          break;
        case "ArrowDown":
          this.socket.sendMoveCommand("ArrowDown");
          break;
      }
    };
  }
}

export default Input;
