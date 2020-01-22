<?php
error_reporting(0);
$v = file_get_contents('app/and/version.txt');
?>
<!DOCTYPE html>
<html>
<head>
	<meta name="renderer" content="webkit">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="telephone=no">
    <title>E彩娱乐</title>
    <style type="text/css">
    	body,ul,ol,li,dl,dt,dd,p,input,i,b,h1,h2,h3,h4,h5,h6,form,fieldset,table,td,img,div,button{margin: 0;padding: 0;}
		ul,li{list-style:none;}
		i,b,h4,h3,h5{font-weight: normal;}
		a{text-decoration:none;}
		img,input,button{border: 0;}
		input:focus{outline: none;}
		/*清浮动*/
		.clearfix:after{content: "";clear:both;display:block;height: 0;overflow:hidden;visibility:hidden;}
		.clearfix{zoom: 1;}
		.fl{float:left;}
		.fr{float:right;}
		body{
			font-size: 24px;
			font-family: MicrosoftYaHei, ArialMT, Arial;
			color: #666;
			overflow-y: scroll; /* has to be scroll, not auto */
		  	-webkit-overflow-scrolling: touch;
		  	-webkit-overflow-scrolling: auto;/* Stops scrolling immediately */
		}
		html{font-size: 100px;-webkit-overflow-scrolling : touch;}
		@media screen and (min-width: 1200px){
			html {
				font-size: 120px;
			}
		}
		@media screen and (min-width: 992px){
			html {
				font-size: 100px;
			}
		}
		html {
		  overflow-y: scroll;
			background: url('img/bg_ios@2x.png') 0 0 repeat-y;
			background-size: 100%;
		}

		:root {
		  overflow-y: auto;
		  overflow-x: hidden;
		}

		:root body {
		  position: absolute;
		}

		body {
		  width: 100vw;
		  overflow: hidden;
		}
		.txt-c {
			text-align: center;
		}
		.fz-60 {
			font-size: 0.8rem;
		}
		.c-white {
			color: #fff;
		}
		.wrapper{
			width: 100%;
			max-width: 7.5rem;
			min-height: 100vh;
			/* background-image: linear-gradient(41deg,
			#fa7b2a 0%,
			#ee3233 100%); */
			margin: 0 auto;
			padding-bottom: .5rem;
		}
		.top{
			width: 100%;
			height: 13.3rem;
			/* background: url('img/bg_android@2x.png') 0 0 no-repeat; */
			background-size: 100% 100%;
			text-align: center;
		}
		.logo{
			height: 1.64rem;
			margin-top: 2rem;
			margin-bottom: .2rem;
		}
		.version{
			height: .6rem;
			line-height: .6rem;
			font-size: .28rem;
			font-family: MicrosoftYaHei;
			color: #fff;
		}
		.download{
			width: 6rem;
			height: .85rem;
			line-height: .85rem;
			font-size: .3rem;
			font-family: MicrosoftYaHei;
			font-weight: 600;
			color: #000;
			background: #ffe300 url('img/icon_android@2x.png') 1.7rem center no-repeat;
			/* background-color: #ffe300; */
			background-size: .49rem .57rem;
			box-shadow: 0px 3px 3px 0px
				rgba(0, 0, 0, 0.1);
			border-radius: 15px;
			margin-top: 1.2rem;
			text-align: center;
			/* text-indent: 2.2rem; */
			cursor: pointer;
		}
		.bottom{
			margin-top: 1.35rem;
			text-align: center;
		}
		.title{
			height: .28rem;
			line-height: .28rem;
			font-size: .32rem;
			color:  #fff;
		}
		.power{
			width: 6.22rem;
			height: 1.2rem;
			line-height: 1.2rem;
			background-color: rgba(255, 255, 255, 0.4);
			border-radius: 20px;
			font-size: .3rem;
			color: #000;
			margin: .3rem auto 0;
			color: #b8b8b7;
		}
		.copy{
			width: 6.22rem;
			height: .9rem;
			line-height: .9rem;
			text-align: center;
			letter-spacing: 2px;
			font-size: .32rem;
			font-weight: 600;
			color: #fff;
			border: solid 1px #fff;
			border-radius: 20px;
			margin: .3rem auto 0;
		}
    </style>
</head>

<body>
	<div class="wrapper">
		<div class="top">
			<div><img class="logo" src="img/logo@2x.png" alt=""></div>
			<!-- <div class="txt-c fz-60 c-white">ECapp</div> -->
			<button class="download" onclick="checktype()">测试环境安卓下载</button>
			<div class="version"> 版本：<?php echo $v;?> </div>
			<div class="bottom">
				<div class="title">若无法下载，请复制以下地址到浏览器打开</div>
				<div class="power">
                                        <script>
                                            var port = document.location.port == "" ? "" : ":"+document.location.port;
                                            var src=window.location.protocol + "//" + document.domain + port + "/testapp/app/and/ecgame.apk";
                                                document.write(src);
                                        </script>
				</div> 
			</div>
		</div>
	</div>
	<script type="text/javascript">

		(function (win) {
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

		function checktype(){
            var u = navigator.userAgent;
		    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		    if (isiOS) {
		        window.location.href="/";
		        return
		    }
		    document.location.href='/testapp/app/and/ecgame.apk';
        }
		checktype();

	</script>
</body>
</html>

