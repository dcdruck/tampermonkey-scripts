// ==UserScript==
// @name         DisplayAd Studio Keyboard Shortcuts
// @namespace    com.dcdworld.tampermonkey.scripts
// @version      1.0
// @description  Enable load/save keyboard shortcuts in the editor.
// @author       David Druckenmiller
// @match        *://*.clipcentric.com/user-*/adEditor.phtml
// @match        *://clipcentric.com/user-*/adEditor.phtml
// @match        *://*.clipcentric.com/user-*/adEditor.phtml*
// @match        *://clipcentric.com/user-*/adEditor.phtml*
// @match        *://*.clipcentric.com/user-*/templateEditor.phtml
// @match        *://clipcentric.com/user-*/templateEditor.phtml
// @match        *://*.clipcentric.com/user-*/templateEditor.phtml*
// @match        *://clipcentric.com/user-*/templateEditor.phtml*
// @match        *://*.clipcentric.com/user-*/ampEditor.phtml
// @match        *://clipcentric.com/user-*/ampEditor.phtml
// @match        *://*.clipcentric.com/user-*/ampEditor.phtml*
// @match        *://clipcentric.com/user-*/ampEditor.phtml*
// @match        *://*.clipcentric.com/user-*/videoEditor.phtml
// @match        *://clipcentric.com/user-*/videoEditor.phtml
// @match        *://*.clipcentric.com/user-*/videoEditor.phtml*
// @match        *://clipcentric.com/user-*/videoEditor.phtml*
// @grant        none
// ==/UserScript==

(function() {

	'use strict';

	let btnLoad, btnSave;

	if (/(a(d|mp)|template)Editor/.test(window.location.href)) {
		btnLoad = document.querySelector('.menu-button[data-click="load-ad-dialog"]');
		btnSave = document.querySelector('.menu-button[data-click="save-ad-dialog"]');
	} else if (/videoEditor/.test(window.location.href)) {
		btnLoad = document.querySelector('#menu-load');
		btnSave = document.querySelector('#menu-save');
	} else {
		return;
	}

	if (window !== window.top) return;

	// Create Ctrl+s and Ctrl+o shortcuts for save/load ad in editor.
	window.addEventListener('keydown', function(e) {
		if (e.ctrlKey) {
			let btn = e.key === 's' ? btnSave : (e.key === 'o' ? btnLoad : undefined);
			if (btn) {
				e.preventDefault();
				triggerClick(btn);
				return true;
			}
		}
	},false);

	function triggerClick(elt) {
		let e = new MouseEvent('click', { bubbles: true, cancelable: false});
		elt && elt.dispatchEvent && elt.dispatchEvent(e);
	}
})();