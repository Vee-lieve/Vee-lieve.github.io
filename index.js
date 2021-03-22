let address = $("#address").val('wss://test.mosquitto.org:8081/mqtt')
let con_btn = $("#con-btn");
let pub_btn = $("#pub-btn");
let sub_btn = $("#sub-btn");
let status = $("#status");

con_btn.click(function () {
  address = $("#address").val();
  var client = mqtt.connect(address);
  status.val("Connecting...");
  client.on('connect', function () {
    console.log('Connected')
    status.val("Connected!");
  })

  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    let values = $("#incoming-msg");
    appendData(topic,message,values);
  })

  let payload;
  // function to published a topic
  pub_btn.click(function () {
    let topic = $("#pub-topic");
    payload = $("#pub-payload");
    let values = $("#published-msg")
    appendData(topic.val(), payload.val(), values);
    client.publish(topic.val(), payload.val());
  })

  // function to subscribed to the topic
  sub_btn.click(function () {
    let topic = $('#sub-topic');
    let values = $("#subscribed-msg");
    appendData(topic.val(), undefined, values);
    client.subscribe(topic.val());
  });

});

//function to append topic and payload
function appendData(topic, payload = undefined, values) {
  let date = new Date();
  let data;
  if (payload == undefined) {
    data = "<tr><td>" + topic + "</td><td>" + date.toGMTString() + "</td></tr>"
  } else {
    data = "<tr><td>" + topic + "</td><td>" + payload + "</td><td>"+date.toGMTString() + "</td></tr>"
  }
  values.append(data);
}