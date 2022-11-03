import SocketHandler from "./socketHandler";

export interface Inputs {
  ArrowRight: boolean;
  ArrowLeft: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
}

class Input {
  socket: SocketHandler;
  inputs: Inputs;
  interval: number;

  constructor(socket: SocketHandler) {
    this.socket = socket;

    this.inputs = {
      ArrowRight: false,
      ArrowLeft: false,
      ArrowUp: false,
      ArrowDown: false,
    };

    document.onkeydown = (e) => this.keysDown(e);
    document.onkeyup = (e) => this.keysUp(e);

    this.interval = setInterval(() => this.move(this.inputs), 50);
  }

  destroy = () => {
    clearInterval(this.interval);
  };

  move = (inputs: Inputs) => {
    if (
      !this.inputs.ArrowDown &&
      !this.inputs.ArrowLeft &&
      !this.inputs.ArrowRight &&
      !this.inputs.ArrowUp
    ) {
      return;
    }

    this.socket.sendMoveCommand(inputs);
  };

  keysDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        this.inputs.ArrowRight = true;
        break;
      case "ArrowLeft":
        this.inputs.ArrowLeft = true;
        break;
      case "ArrowUp":
        this.inputs.ArrowUp = true;
        break;
      case "ArrowDown":
        this.inputs.ArrowDown = true;
        break;
    }
  };

  keysUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        this.inputs.ArrowRight = false;
        break;
      case "ArrowLeft":
        this.inputs.ArrowLeft = false;
        break;
      case "ArrowUp":
        this.inputs.ArrowUp = false;
        break;
      case "ArrowDown":
        this.inputs.ArrowDown = false;
        break;
    }
  };
}

export default Input;
