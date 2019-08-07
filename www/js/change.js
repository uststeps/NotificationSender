
var app = {
    initialize: function() {
        this.bindEvents();
	
    },
	
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	

	onDeviceReady: function() {
		app.onLoad();
		
    },
    
    gotoPage: function(page){
        window.location.replace(page);
    },
	
	onLoad: function() {
		
	},
	
	changePass: function() {
        var oldpass = "password";
        if (localStorage.getItem("newpass") === null) {
            oldpass = "password";
        } else {
            oldpass = localStorage.getItem("newpass");
        }
        
        
        var oldpassInput = $("#oldpass").val();
        var newpass = $("#newpass").val();
        var repass = $("#repass").val();
        
        
        if (oldpassInput != oldpass) {
            
            $("#alert").show();
            $("#alert").attr('class', 'alert alert-danger');
            $("#alert").html(
            " <label>Old password incorrect</label>"
            );
        } else {
            if (newpass != repass) {
                $("#alert").show();
                $("#alert").attr('class', 'alert alert-danger');
                $("#alert").html(
                    " <label> New password does not match!</label>"
                );   
            } else {
                
                if (newpass == "" || repass == "") {
                    $("#alert").show();
                    $("#alert").attr('class', 'alert alert-danger');
                    $("#alert").html(
                        " <label> Password cannot be empty</label>"
                    );    
                } else {
                    localStorage.setItem("newpass", newpass);
                      
                    $("#oldpass").val("");
                    $("#newpass").val("");
                    $("#repass").val("");
                    $("#alert").show();
                    $("#alert").attr('class', 'alert alert-success');
                    $("#alert").html(
                        " <label> Password changed</label>"
                    );  
                }
                
                 
            }
        }
    
	}
	
    
  
	
};
