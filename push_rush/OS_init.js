window.OneSignal = window.OneSignal || [];
OneSignal.push(function () {
  OneSignal.init({
    appId: "59ea98b1-26b6-4fe8-8ac9-803bdbf8ff99",
    notifyButton: { enable: true },
    allowLocalhostAsSecureOrigin: true,
  });

  // Tag on load
  OneSignal.sendTag("game_session", "started");

  // Track when user subscribes
  OneSignal.on("subscriptionChange", function (isSubscribed) {
    if (isSubscribed) {
      OneSignal.sendOutcome("subscribed_to_game_demo");
    }
  });
});
