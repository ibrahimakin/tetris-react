export function getLangTetris() {
    let localLang;
    try { localLang = localStorage.getItem('lang'); }
    catch (e) { }
    return localLang ? JSON.parse(localLang) : 'en';
}