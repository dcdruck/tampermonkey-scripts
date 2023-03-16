# tampermonkey-scripts
This is a collection of Tampermonkey scripts that I have written for myself.

## Scripts

### detrackify-link-urls.js

Scans the DOM for any &lt;a href&gt; elements that have destination URLs encoded in a tracking or refferal URL. For any it can detect, it will replace the entire URL with the decoded destination URL instead. This is a work in progress and only a handful of URL formats are currently detected, but I add more as I encounter them. This runs on every page and runs every few seconds in order to detect new links that appear.

### kohlscharge-keyboard-nav-fix.js

Adds tabIndex properties to the username, password, and submit buttons on the My Kohls Charge login page, thus enabling proper keyboard navigation.

### ubisoft-store-age-gate-defeat.js

Attempts to detect the age gate form at the Ubisoft store (store.ubisoft.com) and populates it with a birth date of 1970-01-01.

### altpress-quiz-repair.js

My browser privacy settings and add-ons prevent the AltPress quizzes, hoster by Apester, from displaying normally inline. This script will detect those frames and replace them with a link to open the quiz in a new window instead.

### clipcentric-editor-keyboard-nav.js

Adds Open and Save keyboard shortcuts (Ctrl+O and Ctrl+S) to the Clipcentric DisplayAd Studio, template editor, AMP editor, and video editor. This is compatible with v10 and newer.

### dummy-tracking-libraries-for-broken-sites.js

I use privacy-protecting features that often cause third-party libraries to
fail to load. Many sites choke when this happens and won't function. Often,
this happens because the site code doesn't check for variables, objects,
functions, libraries, etc before calling them. This script, which runs on all
pages, defines some of these missing libraries (only if they don't already
exist on the page) as dummy functions that have no actual effect.
