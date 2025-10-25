// ==UserScript==
// @name         Auto Click "Stay logged out" on ChatGPT
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically clicks the "Stay logged out" link on chatgpt.com when it appears.
// @author       ChatGPT
// @match        https://chatgpt.com/
// @grant        none
// @run-at       document-idle
// @icon         https://cdn.oaistatic.com/assets/favicon-eex17e9e.ico
// ==/UserScript==

(function () {
    'use strict';

    const targetText = 'Stay logged out';

    function clickStayLoggedOut() {
        const links = document.querySelectorAll('a');
        for (const link of links) {
            if (link.textContent.trim() === targetText) {
                console.log('Found "Stay logged out" link. Clicking...');
                link.click();
                return true;
            }
        }
        return false;
    }

    // Try immediately
    if (clickStayLoggedOut()) return;

    // Observe DOM changes to catch it when it appears
    const observer = new MutationObserver(() => {
        if (clickStayLoggedOut()) {
            observer.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
})();
