import React, { useRef, useState, useEffect, useCallback } from "react"
import Chess from "chess.js"
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { Col } from "antd"

const getRandomFen = (chessRef) => {
  const chess = chessRef.current;
  const moves = [];

  // Generate a random number of moves (between 10 and 30)
  let numMoves = Math.floor(Math.random() * 20) + 10;
  if(numMoves % 2 !== 0)
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

const App = () => {
  const chessRef = useRef(new Chess())
  const [pendingMove, setPendingMove] = useState()
  const [selectVisible, setSelectVisible] = useState(false)
  const [fen, setFen] = useState("")
  const [lastMove, setLastMove] = useState()
  const [topMoves, setTopMoves] = useState([])
  const [arrows, setArrows] = useState([{ brush: 'green', orig: 'e2', dest: 'e4' }, { brush: 'green', orig: 'd2', dest: 'd4' }])
  const groundRef = useRef(null);

useEffect(() => {
  const randomFen = getRandomFen(chessRef);
  setFen(randomFen);
  calculateTopMoves()
}, []);

  const onMove = (from, to) => {
    const moves = chessRef.current.moves({ verbose: true })
    console.log(moves, chessRef.current.fen());
    
    // for (let i = 0, len = moves.length; i < len; i++) { /* eslint-disable-line */
    //   if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
    //     setPendingMove([from, to])
    //     setSelectVisible(true)
    //     return
    //   }
    // }
    if (chessRef.current.move({ from, to, promotion: "x" })) {
      setFen(chessRef.current.fen())
      setLastMove([from, to])
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
      setTopMoves(topFiveMoves);
      console.log('calc', topFiveMoves)
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
      console.log(arrowsForTopMoves)
      // groundRef.current.cg.setShapes(arrowsForTopMoves);
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




