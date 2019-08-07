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
   
        window.location= page;
		
	},
    
    showAlert: function(msg){
        $("#divAlert").show();
        $("#divAlert").html(msg);
    },
	
	onLogin: function() {
        
        if ($("#login-username").val() == "secgen" && $("#login-password").val() == "password") {
            
            return true;
        } else if ($("#login-username").val() ==  ""|| $("#login-password").val() == ""){
            app.showAlert("<strong>Login Failed</strong> Username and password cannot be empty.");
            return false;
        }else {
            app.showAlert("<strong>Login Failed</strong> Invalid Username/Password");
            return false;
        }
        
		
	},
	
	onLoad: function() {
		
	}
	
 
	
};
