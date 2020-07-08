/**
 * The possible values for whose turn it is currently.
 * It can only be one of X, or O.
 */
export enum Turn {
  X,
  O,
}

/**
 * The types of players supported.
 */
export enum Player {
  Human,
  CPU,
}

/**
 * The possible states for the game. It can be looping
 * (Loop) with active squared not clicked on yet. If not
 * looping, either X has won (XWon), O has won (OWon), or
 * it is a draw with no more squares remaining (Draw).
 */
export enum Status {
  Loop,
  XWon,
  OWon,
  Draw,
}

/**
 * The state type for a game. All "global" properties
 * are encapsulate within a single state.
 */
export type GameState = {
  turn: Turn;
  status: Status;
  player_x: Player;
  player_o: Player;
  encoding: string;
  message: HTMLElement;
  buttons: Array<HTMLButtonElement>;
  mode_button: HTMLButtonElement;
  reset_button: HTMLButtonElement;
  covering: HTMLCanvasElement;
};
