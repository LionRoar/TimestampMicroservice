const express = require('express');
const app = express();
const moment = require('moment');

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:date',function(req,res){
  let date = moment(req.params.date);
if(isNaN(req.params.date) && date.isValid())
    res.send({unix:date.unix(),natural:date.format('MMMM D, YYYY')});
else {
  date = moment.unix(req.params.date);
  if(date.unix() > 0 && date.valueOf())
  res.send({unix:date.unix(),natural:date.format('MMMM D, YYYY')});
  else {
    res.send({unix:null,natural:null});

  }
}
});

// listen for requests 
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});