import React, { useRef, useState, useEffect, useCallback } from "react"
import Chess from "chess.js"
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { Col } from "antd"
import GameModal from "./components/victoryModal"

const getRandomFen = (chessRef) => {
  const chess = chessRef.current;
    const moves = [];

  // Generate a random number of moves (between 10 and 30)
  let numMoves = Math.floor(Math.random() * 20) + 10;
  if(numMoves % 2 == 0)
    numMoves++;

  for (let i = 0; i < numMoves; i++) {
    const possibleMoves = chess.moves({ verbose: true, turn: 'w' });
    if (possibleMoves.length === 0) {
      break;
    }
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const move = possibleMoves[randomIndex].san;
    chess.move(move);
    moves.push(move);
  }

  return chess.fen();
};

const checkIsGameOver = (chessRef) => {
  console.log("checking")
  const chess = chessRef.current;
  const gameOver = chess.game_over();

  if (gameOver) {
    if (chess.in_checkmate()) {
      const winner = chess.turn() === 'w' ? 'Black' : 'White';
      return <GameModal gameResult={`Game over. ${winner} wins by checkmate.`}/> 
    } else if (chess.in_draw()) {
      return <GameModal gameResult={'Game over. It\'s a draw.'}/>
    } else if (chess.in_stalemate()) {
      return <GameModal gameResult={'Game over. It\'s a stalemate.'}/>
    } else if (chess.insufficient_material()) {
      return <GameModal gameResult={'Game over. Insufficient material to continue.'}/>
    }
  }

  return false;
};


const App = () => {
  const chessRef = useRef(new Chess())
  const [fen, setFen] = useState("")
  const [lastMove, setLastMove] = useState()
  const groundRef = useRef(null);

useEffect(() => {
    const randomFen = getRandomFen(chessRef);
    setFen(randomFen);
    setTimeout(randomMove, 500);
  }, []);

  const onMove = (from, to) => {
    const moves = chessRef.current.moves({ verbose: true })
    console.log(moves, chessRef.current.fen());
    
    if (chessRef.current.move({ from, to, promotion: "x" })) {
      setFen(chessRef.current.fen())
      setLastMove([from, to])
      checkIsGameOver(chessRef);
      setTimeout(randomMove, 500)
    }
  }

  const randomMove = () => {
    const moves = chessRef.current.moves({ verbose: true })
    const move = moves[Math.floor(Math.random() * moves.length)]
    if (moves.length > 0) {
      chessRef.current.move(move.san)
      setFen(chessRef.current.fen())
      setLastMove([move.from, move.to])
      checkIsGameOver(chessRef);
      calculateTopMoves()
    }
  }

  const turnColor = () => {
    return chessRef.current.turn() === "w" ? "white" : "black"
  }

  const calcMovable = () => {
    const dests = new Map()
    chessRef.current.SQUARES.forEach(s => {
      const ms = chessRef.current.moves({ square: s, verbose: true })
      if (ms.length) dests.set(s, ms.map(m => m.to))
    })
    return {
      free: false,
      dests,
      color: "white"
    }
  }

  const calculateTopMoves = () => {
    if (chessRef.current.turn() === 'w') {

      const moves = chessRef.current.moves({ verbose: true })

      const sortedMoves = moves.sort((a, b) => b.score - a.score)
      const topFiveMoves = sortedMoves.slice(0, 5)
      groundRef.current.cg.setShapes(drawArrows(topFiveMoves));
    }
  }

  const drawArrows = (moves) => {
    if (chessRef.current.turn() === 'w') {
      // Calculate arrows for top moves
      const arrowsForTopMoves = moves.map(move => ({
        brush: 'green',
        orig: move.from,
        dest: move.to
      }));
      return arrowsForTopMoves;
    }
  };


  return (
    <div style={{ background: "#2b313c" }}>
      <Col style={{ marginTop: "5%" }}>
        <Chessground
          width="38vw"
          height="38vw"
          turnColor={turnColor()}
          movable={calcMovable()}
          lastMove={lastMove}
          fen={fen}
          onMove={onMove}
          style={{ margin: "auto" }}
          ref={groundRef}
        />
      </Col>
    </div>
  )
}

export default App;




