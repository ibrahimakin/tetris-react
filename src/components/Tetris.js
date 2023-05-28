import React, { useState } from 'react';
import { createStage, checkCollision } from '../helper';
import { lang_tetris, getLangTetris } from '../lang';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [started, setStarted] = useState(false);
    const [paused, setPaused] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel, highScore, maxRows] = useGameStatus(rowsCleared);

    let lang = getLangTetris();

    const movePlayer = dir => {
        if (!paused && !checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    const startGame = () => {
        // Reset everything
        setStarted(true);
        setStage(createStage());
        setDropTime(800);
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

        if (!paused) {
            if (!checkCollision(player, stage, { x: 0, y: 1 })) {
                updatePlayerPos({ x: 0, y: 1, collided: false });
            } else {
                // Game Over
                if (player.pos.y < 1) {
                    setGameOver(true);
                    setStarted(false);
                    setDropTime(null);
                }
                updatePlayerPos({ x: 0, y: 0, collided: true });
            }
        }
    };

    const keyUp = e => {
        e.preventDefault();
        if (!gameOver) {
            if (e.keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    };

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    };

    const move = e => {
        e.preventDefault();
        if (!gameOver) {
            if (e.keyCode === 37) movePlayer(-1);
            else if (e.keyCode === 39) movePlayer(1);
            else if (e.keyCode === 40) dropPlayer();
            else if (e.keyCode === 38) {
                if (!paused) playerRotate(stage, 1);
            }
        }
    };

    useInterval(drop, dropTime);

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={move} onKeyUp={keyUp}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ?
                        <div className="styled-display gameover"><span lang-tag="game_over">{lang_tetris[lang]['game_over']}</span></div> :
                        <>
                            <div className="styled-display"><span lang-tag="high_score">{lang_tetris[lang]['high_score']}</span>{`: ${highScore}`}</div>
                            <div className="styled-display"><span lang-tag="score">{lang_tetris[lang]['score']}</span>{`: ${score}`}</div>
                            <div className="styled-display"><span lang-tag="max_rows">{lang_tetris[lang]['max_rows']}</span>{`: ${maxRows}`}</div>
                            <div className="styled-display"><span lang-tag="rows">{lang_tetris[lang]['rows']}</span>{`: ${rows}`}</div>
                            <div className="styled-display"><span lang-tag="level">{lang_tetris[lang]['level']}</span>{`: ${level}`}</div>
                        </>
                    }
                    {started &&
                        <button className="styled-button" onClick={() => setPaused(!paused)}>
                            {paused ?
                                <span lang-tag="resume_game">{lang_tetris[lang]['resume_game']}</span> :
                                <span lang-tag="pause_game">{lang_tetris[lang]['pause_game']}</span>
                            }
                        </button>
                    }
                    <button className="styled-button" onClick={startGame}>
                        {started ?
                            <span lang-tag="reset_game">{lang_tetris[lang]['reset_game']}</span> :
                            <span lang-tag="start_game">{lang_tetris[lang]['start_game']}</span>
                        }
                    </button>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;