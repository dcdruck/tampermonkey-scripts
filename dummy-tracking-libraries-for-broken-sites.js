// ==UserScript==
// @name         Dummy tracking libraries to fix broken pages
// @namespace    https://dcdworld.com/
// @version      1.0
// @description  When blocking trackers, sites often break due to site code
//               that isn't resilient enough to deal with these missing
//               libraries. This script will create dummy versions of many of
//               those libraries.
// @author       David Druckenmiller
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function(win) {

    'use strict';

    if (!win.om) {
        win.om = df('trackAction', 'trackState');
    }

    if (!win.s_gi) {
        win.s_gi = function(){
            return {
                getQueryParam: df(),
                tl: df(),
                t: df()
            };
        };
    }

    if (!win._satellite) {
        win._satellite = df('track', {
            getVar: null,
            getVisitorId: null,
            setVars: null,
            setVar: null,
            notify: null, // monoprice.com
            readCookie: ''
        });
    }

    if (!win.s) {
        win.s = df('t', 'tl', 'clearVars', 'visitor', {
            getVisitNum: 1,
            getDaysSinceLastVisit: 666
        });
    }

    if (!win.utag) {
        win.utag = df('link', 'track', 'view');
    }

    if (!win.ga) {
        win.ga = df();
    }

    // Added for Monoprice
    if (!win.TurnTo) {
        win.TurnTo = df('reset');
    }

    if (!win.trackJs) {
        win.trackJs = df('addMetadata');
    }

    // Zillow
    if (!win.e) win.e = df();

    if (!win._etmc) win._etmc = df();

    // For Lenovo.com
    if (!win.adobeAnalyticsSearchComponent) {
        win.adobeAnalyticsSearchComponent = df('methods');
        win.adobeAnalyticsSearchComponent.methods.facetFilterCheckboxAdobeTrack = df();
    }

    // For nyaquarium.com
/*  if (!win.gaplugins) {
        win.gaplugins = df();
        win.gaplugins.Linker = function() {
            return this;
        };
        win.gaplugins.Linker.prototype.decorate = df();
    }*/

    // Humble Bundle
    if (!win.Connect) {
        win.Connect = df('init', 'sdk');
    }

    if (!win.hbspt) {
        win.hbspt = df();
    }

    // Zenni: login won't work without google
    if (!win.google) {
        win.google = df('accounts');
        win.google.accounts.id = df('initialize','renderButton');
    }

    function df() {
        const neutered = () => {};
        for (let i=0; i<arguments.length; i++) {
            if (typeof arguments[i] === 'string') {
                neutered[arguments[i]] = df();
            } else if (typeof arguments[i] === 'object') {
                const props = Object.keys(arguments[i]);
                for (let k=0; k<props.length; k++) {
                    neutered[props[k]] = () => arguments[i][props[k]];
                }
            }
        }
        return neutered;
    }
})(window);
