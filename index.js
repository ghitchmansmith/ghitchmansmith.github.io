function sendNameToOS(){
    var fName = document.getElementById("first_name");
    var lName = document.getElementById("last_name");

    OneSignal.sendTag("first_name", fName);
    OneSignal.sendTag("last_name", lName);
}