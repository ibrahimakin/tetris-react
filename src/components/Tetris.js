import React, { useState } from 'react';
import { createStage } from '../gameHelper';
// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { render } from '@testing-library/react';

const Tetris = (props) => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log('re-render');

    const movePlayer = dir => {
        updatePlayerPos({ x: dir, y: 0 });
    }

    const startGame = () => {
        // Reset everything
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false })
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {       // Left arrow
                movePlayer(-1);
            }
            else if (keyCode === 39) {  // Right arrow
                movePlayer(1);
            }
            else if (keyCode === 40) {  // Down arrow
                dropPlayer();
            }
            else if (keyCode === 2) {   // Right arrow
                movePlayer(1);
            }
        }
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} >
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ?
                        (
                            <Display gameOver={gameOver} text="Game Over" />
                        )
                        :
                        (
                            <div>
                                <Display text="Score" />
                                <Display text="Rows" />
                                <Display text="Level" />
                            </div>
                        )
                    }
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
}

export default Tetris;
