var accountSid = 'SKc4dab82f92b21cdcc375cde63f8a80db';// Acount SID
var aoutToken = '33ae927f6ac3a2cdad226a4dd213bf50'; // Aouth token

var twilio = require('twilio');


var client = new twilio(accountSid, aoutToken);

client.messages.create({ 
	body: 'If you get this you are the real MVP',
	to: '+3473481740',
	from: '+12015146408'
})
.then((message) => console.log(message.sid));
