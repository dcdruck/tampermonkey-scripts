// ==UserScript==
// @name         Ubisoft Store Age Gate Defeat
// @namespace    com.dcdworld.scripts.tampermonkey
// @version      1.0
// @description  Attempts to detect the age gate form and populate values automatically
//                for quicker access.
// @author       David Druckenmiller <developer@dcdworld.com>
// @match        https://store.ubi.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var /** @const */ pollDelay = 2000;

    ubi();

    function ubi() {

    	var container = document.querySelector('#age-gate');

    	if (!container) return retry();

    	var m = container.querySelector('select[name*=_month]');
    	var d = container.querySelector('select[name*=_day]');
    	var y = container.querySelector('select[name*=_year]');

    	if (!m || !d || !y) return retry();

    	m.value = 1;
    	d.value = 1;
    	y.value = 1970;
    }

    function retry() {
        setTimeout(ubi,pollDelay);
    }
})();
