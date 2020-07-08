import * as constants from "./constants.js";
import { Turn } from "./types.js";

/**
 * Returns the symbol for the current turn. It can be
 * used for the buttons' contents as well as for the
 * messages to be displayed.
 * @param turn The turn whose symbol to return.
 */
export const symbol_for = (turn: Turn): string => {
  return turn === Turn.X ? constants.x_sym : constants.o_sym;
};

/**
 * Returns a string representation of the board that is
 * easy to process (compared to decoding the button array).
 * It can also be used to implement an AI for the game. I
 * plan on doing that later.
 * @param buttons The buttons whose state is to be encoded.
 */
export const encoding_for = (buttons: Array<HTMLButtonElement>) => {
  let symbols = Array<string>(9);
  for (const button of buttons) {
    let current_symbol: string;
    switch (button.innerText) {
      case constants.x_sym:
        current_symbol = "X";
        break;
      case constants.o_sym:
        current_symbol = "O";
        break;
      default:
        current_symbol = " ";
    }
    symbols.push(current_symbol);
  }
  return symbols.join("");
};

/**
 * Loads the buttons from the document into the designated
 * button array for easy access later. This should be only
 * called once.
 */
export const retrieve_grid_buttons = (): Array<HTMLButtonElement> => {
  const buttons = new Array<HTMLButtonElement>(9);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i] = document.getElementById(
      (i + 1).toString()
    ) as HTMLButtonElement;
  }
  return buttons;
};

export const retrieve_message_box = (): HTMLElement => {
  const element = document.getElementById("message");
  if (!element) {
    alert("Could not load webpage. Please reconnect and try again.");
    return new HTMLElement();
  } else {
    return element;
  }
};

export const retrieve_ui_button = (name: string): HTMLButtonElement => {
  const element = document.getElementById(name + "-button");
  if (!element) {
    alert("Could not load webpage. Please reconnect and try again.");
    return new HTMLElement() as HTMLButtonElement;
  } else {
    return element as HTMLButtonElement;
  }
};

export const retrieve_canvas = (): HTMLCanvasElement => {
  const element = document.getElementById("covering");
  if (!element) {
    alert("Could not load webpage. Please reconnect and try again.");
    return new HTMLElement() as HTMLCanvasElement;
  } else {
    return element as HTMLCanvasElement;
  }
};
