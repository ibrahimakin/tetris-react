export function getLangTetris() {
    let localLang = localStorage.getItem('lang');
    return localLang ? JSON.parse(localLang) : 'en';
}