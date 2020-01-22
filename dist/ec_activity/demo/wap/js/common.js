function back(args) {
  if ( parent && parent.closeIFrame ) {
    parent.closeIFrame(args)
  } else {
    location.search = args.action
  }
}
(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var dpr = 0;

    var tid;

    function refreshRem() {
      var deviceWidth = document.documentElement.clientWidth
      //6.4是设计稿640/100 6.4只是举个例子，如果是750的设计稿，应该除以7.5。
      docEl.style.fontSize = deviceWidth / 7.5 + 'px';
      //当deviceWidth大于640时，则物理分辨率大于1280（这就看设备的devicePixelRatio这个值了），应该去访问pc网站了
      if (deviceWidth > 640) {
        deviceWidth = 640;
        docEl.style.fontSize = deviceWidth / 7.5 + 'px'
      }

    }

    refreshRem()
    if (!dpr) {
      var isAndroid = win.navigator.appVersion.match(/android/gi);
      var isIPhone = win.navigator.appVersion.match(/iphone/gi);
      var devicePixelRatio = win.devicePixelRatio;
      if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
          dpr = 3;
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
          dpr = 2;
        } else {
          dpr = 1;
        }
      } else if (isAndroid) {
        // Android下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
          dpr = 3;
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
          dpr = 2;
        } else {
          dpr = 1;
        }
      }

    }
    docEl.setAttribute('data-dpr', dpr);

  }(window))