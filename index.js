function sendNameToOS(){
    var fName = document.getElementById("first_name");
    var lName = document.getElementById("last_name");

    OneSignal.push(function(){
        OneSignal.sendTags({"first_name": fName, "last_name": lName,});
    });
}