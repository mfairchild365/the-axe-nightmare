#The axe nightmare
[![Build Status](https://travis-ci.org/mfairchild365/the-axe-nightmare.svg?branch=master)](https://travis-ci.org/mfairchild365/the-axe-nightmare)

The aXe Nightmare (sorry, I couldn't pass that name up) runs the the [aXe-core](https://github.com/dequelabs/axe-core) accessibility checker against a webpage using [nightmare.js](https://github.com/segmentio/nightmare) headless browser (a Chromium based alternative to a phantomjs).

This project is just a proof of concept to see how well nightmare.js actually works with aXe on headless servers. I made it to specifically address performance issuses cause by the webkit based phantomjs. For example, webkit is missing the `elementsFromPoint()` function which provides a huge performance boost in aXe. I was seeing pages that were taking >10min to scan in webkit now being scanned in <10seconds in Chromium.

##Why nightmare.js instead of phantomjs

In my eperience:
* phantomjs is based on webkit which lags behind other browsers by a year or two
* huge benefit in terms of performance boost (see above)
* easy to debug as you can set a flag in nightmare.js to see the browser window while developing, while phantomjs does not have that option
* nightmare.js has a better api (in my personal opinion)

Potential things to investigate
* How performant is nightmare.js compared to phantomjs
* How stable is nightmare.js compared to phantomjs

## Useage
```
./node_modules/xvfb-maybe/src/xvfb-maybe.js node the-axe-nightmare.js "http://google.com/"
```

## Installing (this is the hard part)
Installing this project can be simple or pretty difficult. I've only tried on two operating systems so far (mac and centos).

### install on mac
(heh, this 'just works')

### install on centos server
This is where it gets crazy. nightmare.js works on top of electron, which requires an Xvfb display. `xvfb-maybe.js` spins up a display if it is required for the process to work.

To find out what system libraries need to be installed for electron to work, run `node_modules/electron-prebuilt/dist/electron`. This command should output errors like the following until all system libraries are installed. 

```
node_modules/electron-prebuilt/dist/electron: error while loading shared libraries: libgtk-x11-2.0.so.0: cannot open shared object file: No such file or directory
```

Required system libraries and commands to install on centos
* sudo yum install xorg-x11-server-Xvfb
* sudo yum install gtk2
* sudo yum install libXtst
* sudo yum install libXScrnSaver
* sudo yum install GConf2
* sudo yum install alsa-lib
* sudo yum install xorg-x11-fonts
 * I didn’t see a specific error which indicated that this package needed to be installed. I ended up diving into [this issue](https://github.com/segmentio/nightmare/issues/224) to find the fix.

### install on travisci
This repo will be integrated with travis ci to prove that it can work in that enviroment

#Notes
This is a helpful command for debugging

```
DEBUG=nightmare ./node_modules/xvfb-maybe/src/xvfb-maybe.js node the-axe-nightmare.js "url"
```
