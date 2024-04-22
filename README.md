
  <h1 align="center"> Chess Trainer </h1>

  <p align="center">
    Chess Noobies rise up!
    <br />
    <a href="https://github.com/namandangi/chess-trainer/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://manga-webapp.herokuapp.com/">View Demo</a>
    |
    <a href="https://github.com/namandangi/chess-trainer/issues">Report Bug</a>
    |
    <a href="https://github.com/namandangi/chess-trainer/issues">Request Feature</a>
  </p>

  ![](https://github.com/namandangi/chess-trainer/blob/main/static/demo.gif)

## Build Instructions

#### 1. First the clone the repository locally by

```
git clone https://github.com/namandangi/chess-trainer.git
```

and change directory into the project using:

```
cd ./chess-trainer
```

#### 2. Install all the required packages

In the ui directory of the project using:

```
npm install
```

in case of failures due to outdated packages, run:

```
npm install --legacy-peer-deps
```

#### 3. Run the client

In the ui directory of the project using

```
npm start
```

or alternately: 

```
react-scripts --openssl-legacy-provider start
```

## Road Map

### First Step (Basic Simulator)
- Get the board set-up and the chess engine running
- Simulate random moves and starting position
- Figure out the top 5 moves and indicate that on the board

### Second Step (Chess Trainer)
- Shown 5 moves ask the user to find the best move and maintain a scoreboard / history chart – gamify
- Similarly, shown 5 moves, find the only move that doesn;t work
- Shown a random position figure out if white/black has an advantage or if its an equal position

### Third Step (fun with LLMs)
- Integrate OpenAPI to let chatGPT play against stock fish (one of the best chess engines)
- Integrate multiple different LLM APIs and simulate a tournament between them and stockfish
