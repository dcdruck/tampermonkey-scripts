// ==UserScript==
// @name         Fix Kohls Charge Login Form
// @namespace    com.dcdworld.scripts.tampermonkey
// @version      1.0
// @description  The Kohl's charge login form has broken keyboard navigation. This script fixes it but adding tabIndex attributes.
// @author       David Druckenmiller <developer@dcdworld.com>
// @match        https://credit.kohls.com/eCustService/
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	var loginForm, login;

	loginForm = document.getElementById('loginform');
	if (!loginForm) return; // probably not the login page.

	login = loginForm.querySelector('input#user');
	login.tabIndex = 1;
	login.focus();

	loginForm.querySelector('input#pass').tabIndex = 2;
	loginForm.querySelector('button#loginAction').tabIndex = 3;
})();
