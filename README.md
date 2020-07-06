<div align="center">
  <p>
    <img src="https://i.imgur.com/hkiL0Cf.png" alt="TicTacToe logo" />
  </p>
</div>

<div align="center">
  <p>
    <a href="https://hungrybluedev.github.io/hbd-tictactoe/"><img src="https://img.shields.io/github/deployments/hungrybluedev/hbd-tictactoe/github-pages?label=GitHub%20Pages" alt="GitHub deployments - GitHub Pages" /></a>
    <img src="https://img.shields.io/github/languages/code-size/hungrybluedev/hbd-tictactoe" alt="GitHub code size in bytes" />
    <a href="LICENSE"><img src="https://img.shields.io/github/license/hungrybluedev/hbd-tictactoe" alt="Under MIT License on GitHub" /></a>
  </p>
  </div>

# TicTacToe!

The classic game TicTacToe playable on your browser! ([Link](https://hungrybluedev.github.io/hbd-tictactoe/))
It'll work on all devices and all operating systems. It is also installable through Chrome, Edge, and all major browsers that support Progressive Web Apps.

<div align="center">
<p>
<a href="https://hungrybluedev.github.io/hbd-tictactoe/">
<img width="400px" src="https://i.imgur.com/dLJVHOJ.png" alt="A Screenshot of the TicTacToe App" />
</a>
</p>
</div>

# Works Offline

## Installable

Open the website on your browser. If you go to the tools menu (or something similar), you should be able to find options such as _Install this website as an App_, or _Add App to Home Screen_. These options will install the app on your device and will it will run like a newa-native application.

## Use a Service Worker

I've included a service worker that uses the _offline-first paradigm_.
This causes the page to look for resources in the cache at first.
If the resource requested is not present, we fall back to using the network.

Now, I've listed all the items necessary in the list of resources to cache.
So ideally, it should be able to load the page only once and then have it work offline.

## Troubleshooting

If you're missing any new feature that I've added, try clearing your history and cache.
The site should redownload and work as intended.
If it still doesn't work, contact me [@hungrybluedev](https://twitter.com/hungrybluedev/).

# Progress

- [ ] Core functionality
  - [x] Basic Design
  - [x] Core Game Logic
  - [ ] Info Button
  - [ ] CPU player
  - [ ] Fix Input Mapping for Touch
  - [ ] Add Particle Effects to the End Screen
- [x] Progressive Web App
  - [x] Works Offline
  - [x] Has an App Manifest
  - [x] Has Icons
  
# License

Copyright &copy; Subhomoy Haldar - Hungry Blue Dev

Licensed under the [MIT License](LICENSE).

# Support

You can buy me a coffee at [Ko-Fi](https://ko-fi.com/hungrybluedev).

<a href='https://ko-fi.com/hungrybluedev' target='_blank'>
  <img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' />
</a>

You can support me on [Patreon](https://www.patreon.com/bePatron?u=24185563) on a monthly basis.

<a href="https://patreon.com/hungrybluedev">
  <img height="36" style='border:0px;height:36px;' src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" border='0' alt='Support me on Patreon!' /?
</a>
