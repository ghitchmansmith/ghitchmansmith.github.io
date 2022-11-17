function sendNameToOS(){
    var fName = document.getElementById("first_name").value;
    var lName = document.getElementById("last_name").value;

    OneSignal.push(function(){
        OneSignal.sendTags({"first_name": fName, "last_name": lName,}).then(function (tagsSent){
            loadSubmissionResults();
        });
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        OneSignal.setExternalUserId(fName + " " + lName + " " + date);
    });
}

function loadSubmissionResults(){
    OneSignal.push(function() {
        OneSignal.getTags(function(tags) {
            document.getElementById("first_name").value = tags.first_name;
            document.getElementById("last_name").value = tags.last_name;
        });
      });
}