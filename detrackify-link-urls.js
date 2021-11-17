// ==UserScript==
// @name         Detrackify ad and affiliate link URLs
// @namespace    https://dcdworld.com
// @version      1.0.0
// @description  Seeks out advertising and referral link elements and removes the tracking or referral from the URL.
// @author       You
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let count = 0;

    detrackifyLinks();

    function detrackifyLinks() {

        const rules = [];

        // Links where the destination URI is in query string parameter 'u'.
        // https://disneyplus.bn5x.net/c/156932/741644/9358?subId1=rg&subId2=102605&sharedid=&u=https%3A%2F%2Fwww.disneyplus.com%2Fwelcome%2Fsubscribe
        // https://redirect.viglink.com/?key=204a528a336ede4177fff0d84a044482&u=https%3A%2F%2Fnews.disney.com%2Fdisney-plus-day-offers
        // https://homedepot.sjv.io/c/1435824/483420/8154?subId1=DArtcHolidayLO&u=https%3A%2F%2Fwww.homedepot.com%2Fp%2FHome-Accents-Holiday-7-5-ft-Jackson-Noble-Fir-LED-Pre-Lit-Artificial-Christmas-Tree-with-1200-Color-Changing-Micro-Dot-Lights-W14N0202%2F312822738%23product-overview
        rules.push({
            sel: 'a[href*=".bn5x.net/"], a[href*="//redirect.viglink.com/"], a[href*="sjv.io/"]',
            clean: elem => (elem.href = decodeURIComponent(elem.href.replace(/^.*\?.*u=(http[^&]+).*$/, "$1")))
        });

        // Links where the destination URI is an unescaped part of the path.
        // https://www.anrdoezrs.net/links/8864631/type/dlg/sid/DArtcHolidayLO/https://www.wayfair.com/holiday-decor/pdp/red-barrel-studio-newberry-spruce-green-artificial-christmas-tree-with-color-clear-lights-w003248354.html?piid=1284684231
        rules.push({
            sel: 'a[href^="https://www.anrdoezrs.net/links/"]',
            clean: elem => (elem.href = elem.href.replace(/^https:.*(https:.*)$/, "$1"))
        });

        // Links where the destination URL is in query string parameter 'url'.
        // https://cc.blackfriday.com/v1/otc/00TJYVEe7VpuFpQhOpxcfVu?merchant=00PdyjRpqcbuGvEnK1Ylabm&url=https%3A%2F%2Fwww.homedepot.com%2Fp%2FRYOBI-ONE-18V-90-MPH-200-CFM-Cordless-Battery-Leaf-Blower-Sweeper-with-2-0-Ah-Battery-and-Charger-P2190%2F303180069&t=ad_scan&cd20=025fl7sWUQPOuEdMuBgFIUA&cd22=ad_scan&m=ad_scan_viewer&e=offer_modal&i=get-deal-button&p=1&el=Get+Deal&u=https%3A%2F%2Fblackfriday.com%2Fads%2Fblack-friday%2Fhome-depot
        if (/blackfriday\.com/.test(window.location.hostname)) {
            rules.push({
                sel: 'a[href^="https://cc.blackfriday.com/v1/otc/"][href*="url=http"]',
                clean: elem => (elem.href = decodeURIComponent(elem.href.replace(/^.*\?.*url=(http[^&]+).*$/, "$1")))
            });
        }

        if (/amazon/.test(window.location.hostname)) {
            // Exmple URL:
            // https://aax-us-iad.amazon.com/x/c/Qnvmr6WDTPcwIJWSzPFSaVgAAAF9EReXnQEAAAH2ARK_5CE/https://smile.amazon.com/stores/page/E2EF6585-60EF-4661-B77C-FA3AA3F22A1B/?_encoding=UTF8&store_ref=SB_A0286667AVCE959LLQ1Y&pd_rd_plhdr=t&aaxitk=0cd972deebddc26e06a7fa2ed26ee199&hsa_cr_id=4585657560101&lp_asins=B06Y1B26BR%2CB01GEEJHZO%2CB0748N6ZP2&lp_query=cat%20tree&lp_slot=desktop-hsa-3psl&ref_=sbx_be_s_3psl_mbd_logo&pd_rd_w=HfaC6&pf_rd_p=85014337-b4b1-4f3c-85f8-828d3b814280&pd_rd_wg=kb0hZ&pf_rd_r=K2J42XYB01TNVR1XQFHS&pd_rd_r=ac2adbb7-0b28-470a-a007-45811feb3a3f
            // https://aax-us-iad.amazon.com/x/c/QmDeYYaxYXbyW69d-Z3bsLwAAAF9EQhvogEAAAH2AWJYuP8/https://smile.amazon.com/gp/aw/d/B08FJ3D7HS/?_encoding=UTF8&pd_rd_plhdr=t&aaxitk=d35b55d4246da7716f15e8fd59e1c16b&hsa_cr_id=1127547080501&ref_=sbx_be_s_sparkle_mcd_asin_0_bkgd&pd_rd_w=nfqmc&pf_rd_p=488a18be-6d86-4de0-8607-bd4ea4b560f3&pd_rd_wg=CCyqQ&pf_rd_r=K547SKAWE0SB6ZXVEWWP&pd_rd_r=23170347-1c56-4674-9021-4e13749a9be4
            rules.push({
                sel: 'a[href^="https://aax-us-iad.amazon.com/"][href*=".amazon.com/gp/"], a[href^="https://aax-us-iad.amazon.com/"][href*=".amazon.com/stores/page/"]',
                clean: elem => (elem.href = elem.href.replace(/^https:\/\/aax-us-iad\.amazon\.com\/x\/c\/[^\/]+\/(http.*)\?.*$/, '$1'))
            });
        }

        // Amazon Search URLs on third-party sites.
        // https://www.amazon.com/gp/search?ie=UTF8&linkCode=ur2&linkId=8db78d410f14ea078b83f1d61d13e18d&camp=1789&creative=9325&keywords=RYOBI+13+Amp+8-1%2F4+in.+Table+Saw-RTS08
        rules.push({
            sel: 'a[href^="https://www.amazon.com/gp/search?"]',
            clean: elem => (elem.href = elem.href.replace(/(https:\/\/www\.amazon\.com\/gp\/search\?).*(keywords=[^&]+).*$/, "$1$2"))
        });

        for (let j=0; j<rules.length; j++) {
            const links = document.querySelectorAll(rules[j].sel);
            for (let i=0; i<links.length; i++) {
                let href_orig = links[i].href;
                rules[j].clean(links[i]);
                if (links[i].href === href_orig) {
                    console.warn('Link href was not modified "%s" %o', href_orig, links[i]);
                    links[i].style.backgroundColor = 'rgba(255,0,0,0.2)';
                } else {
                    console.log('Replaced link href "%s" with "%s"', href_orig, links[i].href);
                    links[i].classList.add('druck--cleansed-ad-url');
                }
            }
        }

        setTimeout(detrackifyLinks, ++count < 5 ? 1000 : 2500);
    }
})();
