function sendNameToOS(){
    var fName = document.getElementById("first_name").value;
    var lName = document.getElementById("last_name").value;

    OneSignal.push(function(){
        OneSignal.sendTags({"first_name": fName, "last_name": lName,}).then(function (tagsSent){
            loadSubmissionResults();
        });
    });
}

function loadSubmissionResults(){
    OneSignal.push(function() {
        OneSignal.getTags(function(tags) {
          alert(tags);
        });
      });
}