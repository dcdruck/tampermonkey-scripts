// ==UserScript==
// @name         Alt Press Apester hack
// @namespace    com.dcdworld.scripts.tampermonkey
// @version      1.0
// @description  When browser privacy choices (settings, add-ons, etc) cause AltPress quizzes
//                not to appear, this script will replace the busted frame with an out-link to
//                open the quiz in a new window at Apester website.
// @author       David Druckenmiller <developer@dcdworld.com>
// @match        https://www.altpress.com/quizzes/*
// @match        https://www.altpress.com/altpress-quizzes/*
// @match        https://www.altpress.com/altpress_quizzes/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var quizzes = document.querySelectorAll('.apester-media[data-media-id]');
    quizzes.forEach(function(quiz) {
        var mediaId = quiz.getAttribute('data-media-id');
        if (!mediaId) return;
        var button = document.createElement('button');
        button.textContent = 'Open Quiz in New Tab';
        button.addEventListener('click', function() {
            window.open('https://discover.apester.com/media/'+mediaId, '_blank');
        }, false);
        quiz.appendChild(button);
    });
})();
