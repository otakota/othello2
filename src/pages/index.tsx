import { useState } from 'react';
import styles from './index.module.css';
import { DynamicServerError } from 'next/dist/client/components/hooks-server-context';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
    const directions = [
      [-1, -1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
    ];
    if (board[y][x] === 0) {
      for (const direction of directions) {
        for (let i = 1; i < 8; i++) {
          if (newBoard[y + direction[0] * i] === undefined) {
            break;
          } else {
            if (newBoard[y + direction[0] * i][x + direction[1] * i] === undefined) {
              break;
            } else if (newBoard[y + direction[0] * i][x + direction[1] * i] === 0) {
              break;
            } else if (newBoard[y + direction[0] * i][x + direction[1] * i] === turnColor) {
              if (i > 1) {
                for (let back = i; back >= 0; back--) {
                  newBoard[y + direction[0] * back][x + direction[1] * back] = turnColor;
                }
                setBoard(newBoard);
                setTurnColor(2 / turnColor);
              }
              break;
            } else if (newBoard[y + direction[0] * i][x + direction[1] * i] === 2 / turnColor) {
              continue;
            }
          }
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? 'black' : 'white' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
