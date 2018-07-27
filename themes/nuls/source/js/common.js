(function() {
    'use strict';
    //页面内容较少时，给content-wrap赋一个最小高度，撑开内容
    var clientHeight=document.documentElement.clientHeight || document.body.clientHeight;
    var headerHeight=document.getElementById('header').offsetHeight;
    var footerHeight=document.getElementById('footer').offsetHeight;
    var contentWrapHeight=document.getElementById('content-wrap').style.minHeight=clientHeight-headerHeight-footerHeight+'px';
}());