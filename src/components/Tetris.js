import React, { useState, useEffect } from 'react';

import { createStage, checkCollision } from '../gameHelpers';
import { tr, en } from './lang';
import { TR } from '../lang/types';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = (props) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel, bestScore, maxRows] = useGameStatus(rowsCleared);

  //console.log('re-render');

  const [text, setText] = useState(en);
  
  useEffect(() => {
    if (props.lang === TR) {
      setText(tr);
    }
    else { setText(en); }
  }, [props.lang]);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        //console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        //console.log("interval on")
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    //console.log("interval off")
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <div style={{minHeight:'80vmin', minWidth:`${80*(stage[0].length/stage.length)}vmin`, height:'80vmin', width:`${80*(stage[0].length/stage.length)}vmin`}}>
          <Stage stage={stage} />
        </div>
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text={text.game_over} />
          ) : (
              <div>
                <Display text={`${text.best_score}: ${bestScore}`} />
                <Display text={`${text.score}: ${score}`} />
                <Display text={`${text.max_rows}: ${maxRows}`} />
                <Display text={`${text.rows}: ${rows}`} />
                <Display text={`${text.level}: ${level}`} />
              </div>
            )}
          <StartButton callback={startGame} text={text.start_game} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
