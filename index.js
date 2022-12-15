function sendNameToOS(){
    var fName = document.getElementById("first_name").value;
    var lName = document.getElementById("last_name").value;
    //var emailAddress = document.getElementById("email").value;

    OneSignal.push(function(){
        OneSignal.sendTags({"first_name": fName, "last_name": lName,}).then(function (tagsSent){
            loadSubmissionResults();
        });
        //if(email != "" && email){
        //    OneSignal.setEmail(email);  
        //}
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        OneSignal.setExternalUserId(date);
    });
}

function loadSubmissionResults(){
    OneSignal.push(function() {
        OneSignal.getTags(function(tags) {
            var name_string = "Hello ";
            if(tags.first_name){
                name_string = name_string + " " + tags.first_name;
                if(tags.last_name){
                    name_string = name_string + " " +  tags.last_name;
                }
                name_string = name_string + "!";
            } else {
                name_string = "Please click here to enter your name";
            }
            document.getElementById("name_div").innerHTML = name_string; 
        });
      });
}

function changeName(){
    document.getElementById("main_frame").src = "name.html";
}