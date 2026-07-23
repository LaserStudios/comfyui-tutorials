/* Laser Studios – Sprachwahl / language selection
   Reihenfolge: ?lang= in der URL  >  gespeicherte Wahl  >  Browsersprache  >  Deutsch
   Order:       ?lang= in URL      >  stored choice      >  browser language >  German     */
(function () {
  if (typeof setLang !== 'function') return;   // Seite ohne Sprachumschaltung
  var KEY = 'ls-lang';

  function clean(v) { return (v === 'de' || v === 'en') ? v : null; }

  function fromUrl() {
    try { return clean(new URLSearchParams(location.search).get('lang')); }
    catch (e) { return null; }
  }

  function fromStore() {
    try { return clean(localStorage.getItem(KEY)); } catch (e) { return null; }
  }

  function fromBrowser() {
    var l = (navigator.languages && navigator.languages[0]) || navigator.language || 'de';
    return String(l).toLowerCase().indexOf('de') === 0 ? 'de' : 'en';
  }

  function remember(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* Speicher blockiert – egal */ }
  }

  var de = document.getElementById('btn-de');
  var en = document.getElementById('btn-en');
  if (de) de.addEventListener('click', function () { remember('de'); });
  if (en) en.addEventListener('click', function () { remember('en'); });

  var url = fromUrl();
  if (url) remember(url);                      // bewusste Wahl per Link merken
  setLang(url || fromStore() || fromBrowser());
})();
