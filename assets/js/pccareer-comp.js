var datastring;var dataarray;var searchstring;var locationstring;var pages;var currpage;var app={initialize:function(){this.bindEvents()},bindEvents:function(){document.addEventListener("deviceready",this.onDeviceReady,false)},onDeviceReady:function(){}};function addForm(){console.log("Form listeners started");$("#requestbutton").click(function(){$.mobile.showPageLoadingMsg();checkSubmit()});$("#nextbutton").click(function(){$.mobile.showPageLoadingMsg();updateSearch(searchstring,currpage+1)});$("#prevbutton").click(function(){$.mobile.showPageLoadingMsg();updateSearch(searchstring,currpage-1)});$("#radio-choice-1,#radio-choice-2,#radio-choice-3").change(function(){console.log("radio button activated");if($("#radio-choice-2").prop("checked")){console.log("radio2");$("#countrydiv").hide();$("#id_country").val("");$("#id_country").selectmenu("refresh");$("#statediv").show()}else{if($("#radio-choice-3").prop("checked")){console.log("radio3");$("#statediv").hide();$("#id_state").val("");$("#id_state").selectmenu("refresh");$("#countrydiv").show()}else{$("#countrydiv").hide();$("#statediv").hide();console.log("radio1")}}})}checkSubmit=function(){if($("#radio-choice-2").prop("checked")){locationstring="?location_macro=us"}else{if($("#radio-choice-3").prop("checked")){locationstring="?location_macro=int"}else{locationstring="?location_macro="}}var d=($("#id_country").val()=="")?"":"&country="+$("#id_country").val();var b=($("#id_state").val()=="")?"":"&state="+$("#id_state").val();var g="&classification="+$("#id_classification").val();var j=$("#id_tags").val();var e="";if(j!=null){for(var f=0;f<j.length;f++){e+="&tags="+j[f]}}var a=($("#id_nce").prop("checked")==false)?"":"&nce=on";var c=($("#id_not_advanced_degree_required").prop("checked")==false)?"":"&not_advanced_degree_required=on";var h="&keyword_search="+$("#search-basic").val();searchstring="http://www.peacecorps.gov/resources/returned/careerlink/jobs/"+locationstring+d+b+g+e+a+c+h;updateSearch(searchstring,1)};updateSearch=function(b,a){console.log("spinner deployed");$.ajax({url:b+"&page="+a,type:"GET",success:function(e){datastring=$(e.responseText).find("div#main");console.log(datastring.find("span.step-links"));$("#note").text(datastring.find("p.note").text());pages=Math.ceil((parseInt(datastring.find("p.note strong").text().split(" ")[0],10)/10));currpage=parseInt(datastring.find("span.step-links span.current").text().split(" ")[1],10);$("#nextbutton").removeClass("ui-disabled");$("#prevbutton").removeClass("ui-disabled");if(currpage==pages){$("#nextbutton").addClass("ui-disabled")}if(currpage==1){$("#prevbutton").addClass("ui-disabled")}$("#pagelabel").text("Page "+currpage+" of "+pages);$("#bottomcontainer").show();$("#datatable").html(datastring.find("#resultTable"));dataarray=$("#datatable tr:has(td)").map(function(j,h){var k=$("td",this);return{id:++j,postdate:k.eq(0).text().trim(),deadline:k.eq(1).text().trim(),link:"http://www.peacecorps.gov/"+k.eq(2).html().substring(10,k.eq(2).html().indexOf(">")),jobtitle:k.eq(2).find("a").text(),organization:k.eq(3).text().trim(),city:k.eq(4).text().trim(),state:k.eq(5).text().trim(),country:k.eq(6).text().trim()}}).get();var g='<ul data-role="listview"  data-autodividers="true" data-filter="false" id="reslist" >';var f=dataarray.length;var c;for(var d=0;d<f;d++){if(dataarray[d].country!="United States"){c=" ("+dataarray[d].city+", "+dataarray[d].country+")"}else{c=" ("+dataarray[d].city+", "+dataarray[d].state+")"}g+='<li date="'+dataarray[d].postdate+'"><a href="'+dataarray[d].link+'"><h3>'+dataarray[d].jobtitle+"</h3><h4>"+dataarray[d].organization+c+"</h4></a></li>"}g+="</ul>";console.log(g);$("#resulttable").html(g);$("#reslist").listview({autodividers:true,autodividersSelector:function(h){var i=h.attr("date");return i}}).listview("refresh");$.mobile.hidePageLoadingMsg()}})};$("#PCCPage").on("pageinit",function(a){if(window.innerWidth<385){console.log("narrow window detected");$("label[for='radio-choice-3'] span.ui-btn-text").text("Intl.")}$("#countrydiv").hide();$("#statediv").hide();addForm();updateSearch("http://www.peacecorps.gov/resources/returned/careerlink/jobs/?location_macro=&classification=&keyword_search=",1);searchstring="http://www.peacecorps.gov/resources/returned/careerlink/jobs/?location_macro=&classification=&keyword_search="});