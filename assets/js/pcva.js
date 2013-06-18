// JavaScript Document
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 //Helper methods to check for form completion and change button status.
// var addformlisteners;
 //var checkSubmit;
 
 
 //--------Hack to load faster -- 
 //http://lou.prado.me/tech_blog/how_to_fix_long_start_times_and_blank_white_screen_for_android_apps_built_on_phonegap_and_jqtouch.php
  //main string for the link for mailto:
 
  var mailbase = "mailto:victimadvocate@peacecorps.gov?subject="
  var bodydivider  = "&body=";
 var mailstring;
 var name = "";
 var country = "";
 var date = "";
 var telephone = "";
 var time = "";
 var timezone ="";
 var other="";
 var c1=c2=c3=c4=c5="";
 var emergency;
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		//navigator.splashscreen.hide(); 
        //app.change('requestbutton');
		/*$("#requestbutton").addClass('ui-disabled');
		$("#requestbutton").attr('href',mailstring); 
		addForm();*/
    }
};

 function addForm() {
	 console.log("Form listeners started");
		$("form#required input, textarea").change(function () {
				console.log(this); 
				console.log(this.value);
				checkSubmit(this.value);
				//alert("changed");
			});
			
			$("#checkbox-1,#checkbox-2,#checkbox-3,#checkbox-4,#radio-choice-2, #radio-choice-2").change(function () {
				console.log("CHECKBOX"); 
				console.log(this.value);
				checkSubmit(this.value);
				//alert("changed");
			});
			
			//Add listener for time filed
			$("#checkbox-5").change(function () {
				console.log("checkbox specific time activated"); 
				checkSubmit(this.value);
				if ($("#checkbox-5").prop('checked'))
				{
					$("#time").show();}
					else
					{
						$("#time").hide();
						}
			});

    };

checkSubmit = function(fromval) 
{
	if(fromval="")
	{
		$("#requestbutton").addClass('ui-disabled'); 
	}
	
	 name = $("#name").val();
	 country = $("#country").val();
	 date = $("#startdate").val();
	 telephone = $("#tele").val();
	 time = $("#time").val();
	 	if(time==""){time="(none provided)";} // Add default timezone
	 timezone =$("#timezone").val();
	 other=$("#optional").val();
	 	if(other==""){other="(none provided)";} // Add default timezone
 	 emergency=$('#radio-choice-2').prop('checked');
	
	c1=$("#checkbox-1").prop('checked');
	c2=$("#checkbox-2").prop('checked');
	c3=$("#checkbox-3").prop('checked');
	c4=$("#checkbox-4").prop('checked');
	c5=$("#checkbox-5").prop('checked');
		 
	if (name != "" && country !="" && date!=""&&telephone!=""&&timezone!="")
	{	 
		if(emergency) {
		 mailstring = mailbase + "[EMERGENCY Request]: ";  
		 importance = "";
		 }
		 else {
		 mailstring = mailbase + "[Request]: "; 
		 importance=" not"}
		var d = new Date(); // for now
		var curr_date = d.getDate();
		var curr_month = d.getMonth() + 1; //Months are zero based
		var curr_year = d.getFullYear();
		var datestring = curr_month+"/"+curr_date+"/"+curr_year;
		mailstring = mailstring + name + " (" + country + "). Submitted: "+ datestring + bodydivider + "OVA Notification: Request to contact sent by " + name + " ("+telephone+") currently serving in " + country +". %0D%0A%0D%0AThe timezone of the requested location is (GMT)"+ timezone+". The requester is available at the following times:%0D%0A%0D%0A Before 7AM:"+ c1+"%0D%0A 7-12AM:"+c2+"%0D%0A 12-5PM:"+c3+"%0D%0A After 5PM:"+c4+"%0D%0A Specific Time:"+c5+" %0D%0ATime provided:"+time+"%0D%0A%0D%0A The request has been marked as" + importance + " an emergency.%0D%0A %0D%0AOther notes:" + other +"%0D%0A %0D%0A- Request sent via PCOVA Portal -";
		$("#requestbutton").attr('href',mailstring);
		$("#requestbutton").removeClass('ui-disabled'); //enable
	}
};

//Used for debugging.

$( "#OVAPage" ).on( "pageinit", function( event ) {
		console.log("Device ready");
		$("#requestbutton").addClass('ui-disabled');
		$("#time").hide();
		$("#requestbutton").attr('href',mailstring); 
		addForm();
		//navigator.splashscreen.hide();
});