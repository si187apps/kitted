/* Togged download bar: slides up on every page shortly after landing.
   Store links are tracked as the "togged_site" channel. */
(function () {
  'use strict';
  var IOS = 'https://apps.apple.com/app/apple-store/id6830407645?pt=113544812&ct=togged_site&mt=8';
  var AND = 'https://play.google.com/store/apps/details?id=com.si187apps.outfitstylist&referrer=utm_source%3Dtogged_site%26utm_campaign%3Dlaunch_nov26';
  var KEY = 'togged_storebar_closed';
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

  var apple = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.1.1 2.3-.6 3-1.5z"/></svg>';
  var play = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M4 2.6c-.3.3-.4.7-.4 1.2v16.4c0 .5.1.9.4 1.2l9.3-9.4L4 2.6zm10.4 8.3l2.7-2.7L5.6 1.6c-.3-.2-.7-.2-1 0l9.8 9.3zm0 2.2l-9.8 9.3c.3.2.7.2 1 0l11.5-6.6-2.7-2.7zm6.5-2.8l-2.6-1.5-3 2.9 3 2.9 2.6-1.5c.9-.5.9-2.3 0-2.8z"/></svg>';

  var bar = document.createElement('div');
  bar.className = 'kt-storebar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Download Togged');
  bar.innerHTML =
    '<img class="kt-sb-icon" src="/img/togged-icon.png" alt="" width="40" height="40">' +
    '<div class="kt-sb-text"><b>Togged: AI Stylist</b><span>Free on iPhone &amp; Android</span></div>' +
    '<div class="kt-sb-btns">' +
      '<a class="kt-sb-btn" data-store="ios" href="' + IOS + '" rel="noopener">' + apple + '<span>App Store</span></a>' +
      '<a class="kt-sb-btn" data-store="android" href="' + AND + '" rel="noopener">' + play + '<span>Google Play</span></a>' +
    '</div>' +
    '<button class="kt-sb-close" type="button" aria-label="Close">&times;</button>';

  // On a phone, put the matching store first.
  var ua = navigator.userAgent || '';
  if (/android/i.test(ua)) {
    var btns = bar.querySelector('.kt-sb-btns');
    btns.insertBefore(btns.children[1], btns.children[0]);
  }

  bar.querySelector('.kt-sb-close').addEventListener('click', function () {
    bar.classList.remove('show');
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
  });

  // Sit above the cookie banner while it's showing.
  function place() {
    var cb = document.getElementById('si187-cookie-banner');
    var h = 0;
    if (cb) { var cs = getComputedStyle(cb), r = cb.getBoundingClientRect(); if (cb.classList.contains("visible") && cs.display !== "none" && r.height > 0 && r.top < window.innerHeight) h = window.innerHeight - r.top; }
    bar.style.bottom = (h ? h + 12 : 0) + 'px';
  }

  function start() {
    document.body.appendChild(bar);
    document.body.classList.add('has-storebar');
    place();
    setTimeout(function () { bar.classList.add('show'); }, 400);
    setInterval(place, 600);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
