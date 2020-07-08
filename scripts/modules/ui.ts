import { GameState } from "./types.js";
import { symbol_for } from "./pure_functions.js";
import { iterate_game_loop } from "./logic.js";

export const initialize_grid_buttons = (state: GameState) => {
  state.buttons.forEach((button) => {
    button.onclick = () => {
      button.disabled = true;
      button.innerText = symbol_for(state.turn);
      iterate_game_loop(state);
    };
  });
};

/**
 * Reset the buttons by clearing them and re-enabling them.
 * @param state The state whose buttons to reset.
 */
export const reset_buttons = (state: GameState) => {
  state.buttons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("winning-line");
    button.innerHTML = "";
  });
};

/**
 * A player has won. So we disable all the buttons
 * which will finalize the state of the game and
 * prevent any further interactions.
 * @param state The state whose buttons to disable.
 */
export const disable_all_buttons = (state: GameState) => {
  state.buttons.forEach((button) => {
    button.disabled = true;
  });
};

/**
 * Display whose turn it is on the message element.
 * @param state The state whose message element to update.
 */
export const update_turn_message = (state: GameState) => {
  state.message.innerText = symbol_for(state.turn) + "’s turn!";
};

/**
 * Causes the message, the reset and the mode toggle buttons
 * to enter into a breathing animation to draw attention to
 * them after a game is over.
 * @param state The state whose message to affect.
 */
export const add_breathing_animation = (state: GameState) => {
  state.message.classList.add("breathe");
  state.mode_button.classList.add("breathe");
  state.reset_button.classList.add("breathe");
};
