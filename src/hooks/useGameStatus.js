import { useState, useEffect, useCallback, useRef } from 'react';

export const useGameStatus = rowsCleared => {
    const [rows, setRows] = useState(0);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(0);
    const [maxRows, setMaxRows] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const linePoints = useRef([40, 100, 300, 1200]);

    const setRecord = useCallback((newScore, type) => {
        if (type) {
            if (newScore > highScore) {
                setHighScore(newScore);
                try { localStorage.setItem('tetris_high_score', newScore); }
                catch (e) { }
            }
        }
        else {
            if (newScore > maxRows) {
                setMaxRows(newScore);
                try { localStorage.setItem('tetris_max_rows', newScore); }
                catch (error) { }
            }
        }
    }, [highScore, maxRows]);

    const calcScore = useCallback(() => {
        // We have score
        if (rowsCleared > 0) {
            // This is how original Tetris score is calculated
            setScore(prev => {
                let newScore = prev + linePoints.current[rowsCleared - 1] * (level + 1);
                setRecord(newScore, true);
                return newScore;
            });
            setRows(prev => {
                let newRows = prev + rowsCleared;
                setRecord(newRows);
                return newRows;
            });
        }
    }, [level, linePoints, rowsCleared, setRecord]);

    useEffect(() => {
        let best, row;
        try {
            best = parseInt(localStorage.getItem('tetris_high_score'));
            row = parseInt(localStorage.getItem('tetris_max_rows'));
        } catch (e) { }
        if (best) setHighScore(best);
        if (row) setMaxRows(row);
    }, []);

    useEffect(calcScore, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRows, level, setLevel, highScore, maxRows];
};