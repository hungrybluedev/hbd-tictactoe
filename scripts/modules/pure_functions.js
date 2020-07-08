import * as constants from "./constants.js";
import { Turn } from "./types.js";
export const symbol_for = (turn) => {
    return turn === Turn.X ? constants.x_sym : constants.o_sym;
};
export const encoding_for = (buttons) => {
    let symbols = Array(9);
    for (const button of buttons) {
        let current_symbol;
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
export const retrieve_grid_buttons = () => {
    const buttons = new Array(9);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i] = document.getElementById((i + 1).toString());
    }
    return buttons;
};
export const retrieve_message_box = () => {
    const element = document.getElementById("message");
    if (!element) {
        alert("Could not load webpage. Please reconnect and try again.");
        return new HTMLElement();
    }
    else {
        return element;
    }
};
export const retrieve_ui_button = (name) => {
    const element = document.getElementById(name + "-button");
    if (!element) {
        alert("Could not load webpage. Please reconnect and try again.");
        return new HTMLElement();
    }
    else {
        return element;
    }
};
export const retrieve_canvas = () => {
    const element = document.getElementById("covering");
    if (!element) {
        alert("Could not load webpage. Please reconnect and try again.");
        return new HTMLElement();
    }
    else {
        return element;
    }
};
