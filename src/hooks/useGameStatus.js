import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [maxRows, setMaxRows] = useState(0);

    const linePoints = [40, 100, 300, 1200];

    const calcScore = useCallback(() => {
        // We have score
        if (rowsCleared > 0) {
            // This is how original Tetris score is calculated
            setScore(prev => {
                let newScore = prev + linePoints[rowsCleared - 1] * (level + 1);
                if (newScore > highScore) {
                    setHighScore(newScore);
                    try { localStorage.setItem('tetrisHighScore', newScore); }
                    catch (e) { }
                }
                return newScore;
            });
            setRows(prev => {
                let newRows = prev + rowsCleared;
                if (newRows > maxRows) {
                    setMaxRows(newRows);
                    try { localStorage.setItem('tetrisMaxRows', maxRows); }
                    catch (error) { }
                }
                return newRows;
            });
        }
    }, [level, linePoints, rowsCleared]);

    useEffect(() => {
        let best, row;
        try {
            best = localStorage.getItem('tetrisHighScore');
            row = localStorage.getItem('tetrisMaxRows');
        } catch (e) { }
        if (best) { setHighScore(parseInt(best)); }
        if (row) { setMaxRows(parseInt(row)); }
    }, []);

    useEffect(() => { calcScore(); }, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRows, level, setLevel, highScore, maxRows];
};