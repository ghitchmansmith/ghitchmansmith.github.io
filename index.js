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
            if(tags.first_name){
                document.getElementById("first_name").value = tags.first_name;
            }
            if(tags.last_name){
                document.getElementById("last_name").value = tags.last_name;
            }
        });
      });
}