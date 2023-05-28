export const TETROMINOS = {
    0: { shape: [[0]], color: '0, 0, 0' },
    I: {
        shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]],
        color: '80, 227, 230'
    },
    J: {
        shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]],
        color: '36, 95, 223'
    },
    L: {
        shape: [[0, 'L', 0], [0, 'L', 0], [0, 'L', 'L']],
        color: '223, 173, 36'
    },
    O: {
        shape: [['O', 'O'], ['O', 'O']],
        color: '223, 217, 36'
    },
    S: {
        shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]],
        color: '48, 211, 56'
    },
    T: {
        shape: [[0, 0, 0], ['T', 'T', 'T'], [0, 'T', 0]],
        color: '132, 61, 198'
    },
    Z: {
        shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]],
        color: '227, 78, 78'
    }
};

export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino];
};

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            // 1. Check that we're on an actual Tetromino cell
            if (player.tetromino[y][x] !== 0) {
                if (
                    // 2. Check that our move is inside the game areas height (y)
                    // We shouldn't go through the bottom of the play area
                    !stage[y + player.pos.y + moveY] ||
                    // 3. Check that our move is inside the game areas width (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    // 4. Check that the cell wer'e moving to isn't set to clear
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
};