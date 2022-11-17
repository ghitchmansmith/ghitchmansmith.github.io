function sendNameToOS(){
    var fName = document.getElementById("first_name").value;
    var lName = document.getElementById("last_name").value;

    OneSignal.push(function(){
        OneSignal.sendTags({"first_name": fName, "last_name": lName,}).then(function (tagsSent){
            loadSubmissionResults();
        });
        OneSignal.setExternalUserId(fName + " " + lName);
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