export const lang_tetris = {
    tr: {
        score: 'Skor',
        rows: 'Satir',
        level: 'Seviye',
        start_game: 'Basla',
        reset_game: 'Sifirla',
        game_over: 'Oyun Bitti',
        high_score: 'En Yuksek Skor',
        max_rows: 'Maks. Satir',
        pause_game: 'Duraklat',
        resume_game: 'Devam Et'
    },
    en: {
        score: 'Score',
        rows: 'Rows',
        level: 'Level',
        start_game: 'Start',
        reset_game: 'Reset',
        game_over: 'Game Over',
        high_score: 'High Score',
        max_rows: 'Max Rows',
        pause_game: 'Pause',
        resume_game: 'Resume'
    }
};

export function getLangTetris() {
    let localLang;
    try { localLang = localStorage.getItem('lang'); }
    catch (e) { }
    return localLang === 'tr' ? 'tr' : 'en';
}