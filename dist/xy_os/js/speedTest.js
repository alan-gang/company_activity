
$(function() {
	var urls = [];
	var timeArray = [];
	$.ajax({
	    url: "/dongsen/domains.do?method=getAllDomains",
	    jsonp: "callback",
	    async: true,
	    type: "GET",
	    success: function(req) {
	    	var allDomains = (JSON.parse(req)).allDomains;
	    	for (var i = 0; i < allDomains.length; i++) {
	    		urls.push(allDomains[i].domain);
	    	}
	    	test(urls)
	    }
	});


    function test (urls) {
    	for (var i = 0; i < urls.length; i++) {
    		testAline(urls[i] + '/static/cb.js', i)
		}
    };
    function testAline (url, i) {
    	var st =  new Date().getTime()
    	$.ajax({
		    url: url,
		    jsonp: "callback",
		    dataType: "jsonp",
		    async: true,
		    type: "GET",
		    complete: function(rep) {
		    	var et =  new Date().getTime();
		    	if ( rep.readyState == 4 && rep.status == 200) {
		    		timeArray[i] = et - st;
		    	}
		    	// last test
		    	if (i == (urls.length -1)) {
					getMaxSpeed()
		    	}
		    }
    	});
    };

    function getMaxSpeed () {
      setTimeout(function() {
	    var k = 0;
		for(var i = 1; i < timeArray.length; i++) {
		  if(timeArray[i] < timeArray[k]) k = i;
		}
		$('.goXin').attr('href',urls[k]);
		console.log(k, timeArray[k], timeArray, urls[k])
      }, 2000)
    }
})