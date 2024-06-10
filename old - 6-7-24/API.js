const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Authorization': 'Basic N2NkM2M0YWMtZGI0NC00OWY5LWI4MDMtNzMxNWI4ZGM4NDVi',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      app_id: '59ea98b1-26b6-4fe8-8ac9-803bdbf8ff99',
      contents: {"en":"Hello World"},
      included_segments: ['Subscribed Users']
    })
  };

console.log("https://onesignal.com/api/v1/notifications"+JSON.stringify(options));

fetch("https://onesignal.com/api/v1/notifications", options)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));