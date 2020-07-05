/***********************************
 * Constants that are loaded once. *
 ***********************************/

// Unicode emoji for X
const x_sym = "❌";
// Unicode emoji for O
const o_sym = "⭕";

/**
 * The possible values for whose turn it is currently.
 * It can only be one of X, or O.
 */
enum Turn {
  X,
  O,
}

/**
 * The opponent whom the human is playing against.
 */
enum Opponent {
  Human,
  CPU,
}

/**
 * The possible states for the game. It can be looping
 * (Loop) with active squared not clicked on yet. If not
 * looping, either X has won (XWon), O has won (OWon), or
 * it is a draw with no more squares remaining (Draw).
 */
enum Status {
  Loop,
  XWon,
  OWon,
  Draw,
}

const rows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];
const columns = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
const diagonals = [
  [0, 4, 8],
  [2, 4, 6],
];
const cases = [...rows, ...columns, ...diagonals];

/**
 * The state type for a game. All "global" properties
 * are encapsulate within a single state.
 */
type GameState = {
  turn: Turn;
  status: Status;
  opponent: Opponent;
  encoding: string;
  message: HTMLElement;
  buttons: Array<HTMLButtonElement>;
  mode_button: HTMLButtonElement;
  reset_button: HTMLButtonElement;
  covering: HTMLCanvasElement;
};

/**
 * Returns the symbol for the current turn. It can be
 * used for the buttons' contents as well as for the
 * messages to be displayed.
 * @param turn The turn whose symbol to return.
 */
const symbol_for = (turn: Turn): string => {
  return turn === Turn.X ? x_sym : o_sym;
};

/**
 * Returns a string representation of the board that is
 * easy to process (compared to decoding the button array).
 * It can also be used to implement an AI for the game. I
 * plan on doing that later.
 * @param buttons The buttons whose state is to be encoded.
 */
const encoding_for = (buttons: Array<HTMLButtonElement>) => {
  let symbols = Array<string>(9);
  for (const button of buttons) {
    let current_symbol: string;
    switch (button.innerText) {
      case x_sym:
        current_symbol = "X";
        break;
      case o_sym:
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
const initialize_buttons = (): Array<HTMLButtonElement> => {
  const buttons = new Array<HTMLButtonElement>(9);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i] = document.getElementById(
      (i + 1).toString()
    ) as HTMLButtonElement;
  }
  buttons.forEach((button) => {
    button.onclick = () => {
      button.disabled = true;
      button.innerText = symbol_for(state.turn);
      iterate_game_loop();
    };
  });
  return buttons;
};

const initialize_message = (): HTMLElement => {
  const element = document.getElementById("message");
  if (!element) {
    alert("Could not load webpage. Please reconnect and try again.");
    return new HTMLElement();
  } else {
    return element;
  }
};

const initialize_button = (name: string): HTMLButtonElement => {
  const element = document.getElementById(name + "-button");
  if (!element) {
    alert("Could not load webpage. Please reconnect and try again.");
    return new HTMLElement() as HTMLButtonElement;
  } else {
    return element as HTMLButtonElement;
  }
};

const initialize_covering = (): HTMLCanvasElement => {
  const element = document.getElementById("covering");
  if (!element) {
    alert("Could not load webpage. Please reconnect and try again.");
    return new HTMLElement() as HTMLCanvasElement;
  } else {
    return element as HTMLCanvasElement;
  }
};

/**************************************
 * Functions for UI interaction logic *
 **************************************/

/**
 * Reset the buttons by clearing them and re-enabling them.
 * @param state The state whose buttons to reset.
 */
let reset_buttons = (state: GameState) => {
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
let disable_all_buttons = (state: GameState) => {
  state.buttons.forEach((button) => {
    button.disabled = true;
  });
};

/**
 * Display whose turn it is on the message element.
 * @param state The state whose message element to update.
 */
const update_turn_message = (state: GameState) => {
  state.message.innerText = symbol_for(state.turn) + "’s turn!";
};

/**
 * Causes the message, the reset and the mode toggle buttons
 * to enter into a breathing animation to draw attention to
 * them after a game is over.
 * @param state The state whose message to affect.
 */
const add_breathing_animation = (state: GameState) => {
  state.message.classList.add("breathe");
  state.mode_button.classList.add("breathe");
  state.reset_button.classList.add("breathe");
};

const update_status = (state: GameState) => {
  if (is_game_drawn(state)) {
    state.message.innerHTML = "<strong>Draw!</strong>";
    state.status = Status.Draw;
    add_breathing_animation(state);
    return;
  }
  if (has_a_player_won(state)) {
    state.status = state.turn === Turn.X ? Status.XWon : Status.OWon;
    add_breathing_animation(state);
    disable_all_buttons(state);
    return;
  }
  state.status = Status.Loop;
};

const new_game = (): GameState => {
  let temporary_button_array = initialize_buttons();
  const state: GameState = {
    buttons: temporary_button_array,
    turn: Turn.X,
    status: Status.Loop,
    message: initialize_message(),
    opponent: Opponent.Human,
    encoding: encoding_for(temporary_button_array),
    mode_button: initialize_button("mode"),
    reset_button: initialize_button("reset"),
    covering: initialize_covering(),
  };
  update_turn_message(state);
  reset_buttons(state);
  state.message.classList.remove("breathe");
  state.mode_button.classList.remove("breathe");
  state.reset_button.classList.remove("breathe");
  state.covering.classList.remove("active");
  return state;
};

const toggle_player_mode = (previous_state: GameState): GameState => {
  let previous_opponent = previous_state.opponent;
  let state = new_game();
  state.mode_button.classList.toggle("pvc");
  state.mode_button.classList.toggle("pvp");
  state.opponent =
    previous_opponent === Opponent.CPU ? Opponent.Human : Opponent.CPU;
  return state;
};

const has_a_player_won = (state: GameState): boolean => {
  const symbol = state.turn === Turn.X ? "X" : "O";
  for (let locations of cases) {
    let count = 0;

    for (let location of locations) {
      if (state.encoding[location] === symbol) {
        count++;
      }
    }

    if (count !== 3) {
      continue;
    }

    state.message.innerText = symbol + " won!🎉";

    for (let location of locations) {
      state.buttons[location].classList.add("winning-line");
    }

    return true;
  }
  return false;
};

const is_game_drawn = (state: GameState): boolean => {
  for (let button of state.buttons) {
    if (!button.disabled) {
      return false;
    }
  }
  return !has_a_player_won(state);
};

const iterate_game_loop = () => {
  state.encoding = encoding_for(state.buttons);
  update_status(state);

  if (state.status !== Status.Loop) {
    state.covering.classList.add("active");
    return;
  }

  let next_turn = state.turn === Turn.X ? Turn.O : Turn.X;
  state.turn = next_turn;
  update_turn_message(state);
};

/**********************************
 *  To be called at load/refresh. *
 **********************************/

let state = new_game();
