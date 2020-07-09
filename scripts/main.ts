// The service worker provides the foundation for the PWA capabilities
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch((err) => console.log(err));
}

import { new_game, toggle_player_mode } from "./modules/logic.js";

let state = new_game();

state.reset_button.onclick = () => {
  state = new_game();
};

state.mode_button.onclick = () => {
  state = toggle_player_mode(state);
};

const info_button = document.getElementById("info-button");
if (info_button) {
  info_button.onclick = () => {
    window.open("https://github.com/hungrybluedev/hbd-tictactoe");
  };
}
