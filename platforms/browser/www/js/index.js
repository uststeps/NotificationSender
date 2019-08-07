var app = {
    initialize: function() {
        this.bindEvents();

    },
	
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	

	onDeviceReady: function() {
        localStorage.setItem("server","http://172.16.80.1:7101/servicePUSH/resources/services/");
        localStorage.getItem("phrase","w4m1Q+J7l'K@VhZ");
        
        //window.location = "Send.html";
    },

	onDevicePreDisplay: function() {
		
	},

	gotoPage: function(page){
   
        window.location = page;
		
	},
    
    showAlert: function(msg,code){
        $("#divAlert").show();
         $("#alert").attr('class', 'alert alert-' + code);
        $("#divAlert").html(msg);
    },
	
	onLogin: function() {
        
        var passFlag = "password";

        if (localStorage.getItem("newpass") === null  || localStorage.getItem("newpass") == undefined) {
            passFlag = "password";
        } else {
            passFlag = localStorage.getItem("newpass");

        }
        
        if ($("#login-username").val() == "secgen" && $("#login-password").val() == passFlag) {
            
            return true;
        } else if ($("#login-username").val() ==  ""|| $("#login-password").val() == ""){
            app.showAlert("<strong>Login Failed</strong> Username and password cannot be empty.", "danger");
            return false;
        }else {
            
            if (passFlag == "password"){
                app.showAlert("<strong>Login Failed</strong> Invalid Username/Password. <br> Password is default.", "danger");
            } else {
                app.showAlert("<strong>Login Failed</strong> Invalid Username/Password", "danger");
            }
           
            
            
            return false;
        }
        
		
	},
	
	onLoad: function() {
		
	}
	
 
	
};
