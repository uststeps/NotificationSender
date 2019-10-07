
var app = {
    initialize: function() {
        this.bindEvents();
	
    },
	
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	

	onDeviceReady: function() {
		app.onLoad();
		var config = {
                apiKey: "AIzaSyCS6uR5RRrJKi2V1VFZLp9iMC_Jwbf8vgc ",
                authDomain: "myuste-studentportal.firebaseapp.com",
                databaseURL: "https://myuste-studentportal.firebaseio.com",
                storageBucket: "myuste-studentportal.appspot.com",
                messagingSenderId: "520123709331"
                
              };
             
		firebase.initializeApp(config);	
		
    },
    
    gotoPage: function(page){
        window.location.replace(page); 
    },
	
	onLoad: function() {
		
	},
	
	//
	// Loop Through until finished sending
	//
	
	sendPush: function() {
		
	
		var bodyTxt = $("#txtBody").val();
		var titleTxt = $("#txtTitle").val();
		var toTxt ="";
		var authKey = "key=AAAAeRnJ95M:APA91bHpZ6CZfV2RchWaGeD9SkSlQdIOM6wrXxUJHQl_ilNQB4KBWrfh3EbOYvOn7ACnmYrziB_JeWRxrk4bXEgafsKIUgmn-cBV9yfHuZitx3x0jDRtMW-qy3xSVA2XOiTTb-c3YlMj";
		var contentTypeVal = 'application/json';

		toTxtAnd = "andstudent";
        toTxtIos =  "iosstudent";
		
		var fcmAPIURL = "https://fcm.googleapis.com/fcm/send";
		
		//toTxtAnd = "gurus-test"; // TEST TOPIC
        //toTxtIos =  "gurus-test"; // TEST TOPIC
		
        if (titleTxt == "" || titleTxt == null) {
            alert("Title cannot be empty.");
        } else if (bodyTxt == "" || bodyTxt == null) {
            alert("Message body cannot be empty.");     
        } else {
			$("#formHolder").hide();
            $("#alert").show();
			$("#prompt").hide();
			
			var iosSent = false;
			var andSent = false;
			var today = new Date();
			var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();

            //alert("trying to send...");
                
			if ($("#sendto").val() == "all"){
							$.ajax(
								{	type: "POST",
									url: fcmAPIURL,
									headers: { Authorization: authKey } ,
									contentType: contentTypeVal,
									data: JSON.stringify( 
															{
															   "to" :  "/topics/" + toTxtAnd,
															   "data":
															   {
																   "title" : titleTxt,
																   "message" : bodyTxt,
																   "receivedDate"  : date ,
																   "content-available" : 1  
															   }
															} 
														),
									success: function(data) {
										andSent = true;
											
										//########################################################
										 $.ajax(
												{	type: "POST",
													url: fcmAPIURL ,
													headers: { Authorization: authKey } ,
													contentType: contentTypeVal,
													data: JSON.stringify( 
																			{
																			   "to" :  "/topics/" + toTxtIos,
																				"notification" : {
																				   "title" : titleTxt,
																				   "body"  : bodyTxt
																			   },
																			   "data":
																			   {
																				   "receivedDate" : date
																			   },
																			   "priority" : "high"
																			} 
																		),
													success: function(data) {
														iosSent = true;
														
														
														$("#formHolder").show();
														$("#alert").hide();
														
														
														
														if (iosSent && andSent) {
															alert("Notification Sent!");
															$("#prompt").removeClass();
															$("#prompt").addClass("alert alert-success");
															$("#prompt").html("Notification sent");
															$("#prompt").show();
															app.logPush(titleTxt,bodyTxt,1,1,0);
														} else if (!iosSent && andSent) {
															alert("Notification sent to android device but encounter an error sending to iOS device, please try again");
															$("#prompt").removeClass();
															$("#prompt").addClass("alert alert-warning");
															$("#prompt").html("Notification sent on android but not on iOS devices.");
															$("#prompt").show();
															app.logPush(titleTxt,bodyTxt,0,1,0);
														} else if (iosSent && !andSent){
															alert("Notification sent to iOS device but encounter an error sending to android device, please try again");
															$("#prompt").removeClass();
															$("#prompt").addClass("alert alert-warning");
															$("#prompt").html("Notification sent on iOS but not on android devices.");
															$("#prompt").show();
															app.logPush(titleTxt,bodyTxt,0,1,0);
														} else if (!iosSent && !andSent){
															alert("Notification sending failed! please try again");
															$("#prompt").removeClass();
															$("#prompt").addClass("alert alert-danger");
															$("#prompt").html("Notification was not sent on both devices.");
															$("#prompt").show();
															app.logPush(titleTxt,bodyTxt,0,1,0);
														}
													} ,
													error: function(xhr, statusText, errorCode) {
														$("#formHolder").show();
														$("#alert").hide();
														alert("Notification sent to android device but encounter an error sending to iOS device, please try again");
														$("#prompt").removeClass();
														$("#prompt").addClass("alert alert-warning");
														$("#prompt").html("Notification sent on android but not on iOS devices.");
														$("#prompt").show();
														app.logPush(titleTxt,bodyTxt,0,1,0);
													}
												
												}
											);
										 
										 
										 //########################################################
										 
									} ,
									error: function(xhr, statusText, errorCode) {
										$("#formHolder").show();
										$("#alert").hide();
										alert("Sending of notification failed.");
										$("#prompt").removeClass();
										$("#prompt").addClass("alert alert-danger");
										$("#prompt").html("Notification was not sent on both devices.");
										$("#prompt").show();
										app.logPush(titleTxt,bodyTxt,0,1,0);
									}
								
								}
								);
			} else if ($("#sendto").val() == "and") {
				$.ajax(
					{	type: "POST",
						url: fcmAPIURL,
						headers: { Authorization: authKey } ,
						contentType: contentTypeVal,
						data: JSON.stringify( 
												{
												   "to" :  "/topics/" + toTxtAnd,
												   "data":
												   {
													   "title" : titleTxt,
													   "message" : bodyTxt,
													   "receivedDate"  : date ,
													   "content-available" : 1  
												   }
												} 
											),
						success: function(data) {
							andSent = true;
							alert("Notification Sent!");
							$("#prompt").removeClass();
							$("#prompt").addClass("alert alert-success");
							$("#prompt").html("Notification sent to target devices: android");
							$("#prompt").show();
							app.logPush(titleTxt,bodyTxt,1,1,0);
							$("#formHolder").show();
							$("#alert").hide();			
							 
						} ,
						error: function(xhr, statusText, errorCode) {
							$("#formHolder").show();
							$("#alert").hide();
							alert("Sending of notification failed.");
							$("#prompt").removeClass();
							$("#prompt").addClass("alert alert-danger");
							$("#prompt").html("Notification was not sent on target devices: android.");
							$("#prompt").show();
							app.logPush(titleTxt,bodyTxt,0,1,0);
						}
					
					}
					);
			} else if ($("#sendto").val() == "ios"){
				 $.ajax(
					{	type: "POST",
						url: fcmAPIURL,
						headers: { Authorization:authKey } ,
						contentType: contentTypeVal,
						data: JSON.stringify( 
								{
									"to" :  "/topics/" + toTxtIos,
									"notification" : {
								    "title" : titleTxt,
									"body"  : bodyTxt
										},
									"data":
										{"receivedDate" : date},
									"priority" : "high"
								} 
						),
						success: function(data) {
							iosSent = true;
							alert("Notification Sent!");
							$("#prompt").removeClass();
							$("#prompt").addClass("alert alert-success");
							$("#prompt").html("Notification sent to target devices: iOS");
							$("#prompt").show();
							app.logPush(titleTxt,bodyTxt,1,1,0);
							$("#formHolder").show();
							$("#alert").hide();
						} ,
						error: function(xhr, statusText, errorCode) {
							$("#formHolder").show();
							$("#alert").hide();
							alert("Sending of notification failed.");
							$("#prompt").removeClass();
							$("#prompt").addClass("alert alert-danger");
							$("#prompt").html("Notification was not sent on target devices: iOS.");
							$("#prompt").show();
							app.logPush(titleTxt,bodyTxt,0,1,0);
							
						}
					}
				);
			}
				

            
           // alert("sending finished");
            
    
		};
	
	},
	
    
  
    logPush: function(subj,body,stat,allFlag,empNum){
        //alert(localStorage.getItem("server") + "pushLog?subj=" + subj + "&text=" + body +  "&status=" + stat +  "&flag=" + allFlag + "&emp=" + empNum);
		/*
		$.ajax({
			  url: localStorage.getItem("server") + "pushLog?subj=" + subj + "&text=" + body +  "&status=" + stat +  "&flag=" + allFlag + "&emp=" + empNum,
			  type: "get",
			  beforeSend: function(xhr){xhr.setRequestHeader('requester', localStorage.getItem("phrase"));},
			  success: function(msg){
				//alert(msg.Result);
			  },
			  error: function(XMLHttpRequest, textStatus, errorThrown) {
                //alert(JSON.stringify(XMLHttpRequest));
			  }
			})
		*/
		var notifDetails = {
			subject : subj,
			body : body,
			status : parseInt(stat),
			allflag: parseInt(allFlag) ,
			by: "registrar"
			
		};
			
		$.ajax({
			url: "https://myuste.ust.edu.ph/myUSTE-StudentPortal-REST-RESTWebService-context-root/resources/service/lognotification",
			dataType: "json",
			type: "POST",
			beforeSend: function(head){
				head.setRequestHeader('notifDetails'  ,JSON.stringify(notifDetails)); 
			}, 
			success: function(data) {
				if (data["status"]=="error"){
					alert("There was a problem logging the notification");
				}
				//alert(JSON.stringify(data));
			},
			error: function(jqXHR	, textStatus, errorThrown) {  
				alert("There was a problem logging the notification : error code - " + JSON.stringify(jqXHR));
				//alert(JSON.stringify(jqXHR));
			}
		});;
			
	
	}
 
	
};
