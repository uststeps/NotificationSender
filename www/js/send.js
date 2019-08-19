
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


		//toTxtAnd = "andstudent";
        //toTxtIos =  "iosstudent";
		toTxtAnd = "gurus-test"; // TEST TOPIC
        toTxtIos =  "gurus-test"; // TEST TOPIC
		
        if (titleTxt == "" || titleTxt == null) {
            alert("Title cannot be empty.");
        } else if (bodyTxt == "" || bodyTxt == null) {
            alert("Message body cannot be empty.");     
        } else {
			$("#formHolder").hide();
            $("#alert").show();
			
			var iosSent = false;
			var andSent = false;
			var today = new Date();
			var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();

            //alert("trying to send...");
                
			$.ajax(
			{	type: "POST",
				url: "https://fcm.googleapis.com/fcm/send",
				headers: { Authorization: "key=AAAAeRnJ95M:APA91bHpZ6CZfV2RchWaGeD9SkSlQdIOM6wrXxUJHQl_ilNQB4KBWrfh3EbOYvOn7ACnmYrziB_JeWRxrk4bXEgafsKIUgmn-cBV9yfHuZitx3x0jDRtMW-qy3xSVA2XOiTTb-c3YlMj" } ,
				contentType: 'application/json',
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
								url: "https://fcm.googleapis.com/fcm/send",
								headers: { Authorization: "key=AAAAeRnJ95M:APA91bHpZ6CZfV2RchWaGeD9SkSlQdIOM6wrXxUJHQl_ilNQB4KBWrfh3EbOYvOn7ACnmYrziB_JeWRxrk4bXEgafsKIUgmn-cBV9yfHuZitx3x0jDRtMW-qy3xSVA2XOiTTb-c3YlMj" } ,
								contentType: 'application/json',
								data: JSON.stringify( 
														{
														   "to" :  "/topics/" + toTxtIos,
															"notification" : {
															   "title" : titleTxt,
															   "body"  : bodyTxt
														   },
														   "data":
														   {
															   "receivedDate" : "TEST DATE"
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
                                        //app.logPush(titleTxt,bodyTxt,1,1,0);
                                    } else if (!iosSent && andSent) {
                                        alert("Notification sent to android device but encounter an error sending to iOS device, please try again");
                                        //app.logPush(titleTxt,bodyTxt,0,1,0);
                                    } else if (iosSent && !andSent){
                                        alert("Notification sent to iOS device but encounter an error sending to android device, please try again");
                                        //app.logPush(titleTxt,bodyTxt,0,1,0);
                                    } else if (!iosSent && !andSent){
                                        alert("Notification sending failed! please try again");
                                        //app.logPush(titleTxt,bodyTxt,0,1,0);
                                    }
								} ,
								error: function(xhr, statusText, errorCode) {
									//alert("Sending Failed");
								}
							
							}
						);
					 
					 
					 //########################################################
					 
				} ,
				error: function(xhr, statusText, errorCode) {
					//alert(JSON.stringify(xhr));
				}
			
			}
			);
            
           // alert("sending finished");
            
    
		};
	
	},
	
    
  
    logPush: function(subj,body,stat,allFlag,empNum){
        //alert(localStorage.getItem("server") + "pushLog?subj=" + subj + "&text=" + body +  "&status=" + stat +  "&flag=" + allFlag + "&emp=" + empNum);
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
			});
			
	
	}
 
	
};
