// ==UserScript==
// @name         eBay Search Results in Same Window
// @namespace    com.dcdworld.scripts.tampermonkey
// @version      0.1
// @description  eBay started opening search result clicks in new windows,
//                which is lame. This script removes the target attribute
//                to restore the normal behavior.
// @author       You
// @match        https://www.ebay.com/sch/*
// @icon         https://www.google.com/s2/favicons?domain=ebay.com
// @grant        none
// ==/UserScript==

!function() {
    'use strict';
    cleanLinks();
    setInterval(cleanLinks,2000);
    function cleanLinks() {
        const links = document.querySelectorAll('a.s-item__link, .s-item__image a');
        links.forEach(item => (/\/itm\//.test(item.getAttribute('href')) && item.removeAttribute('target')));
    }
}();
