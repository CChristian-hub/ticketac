let mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  
mongoose.connect('your mongo db cluster link',
  options,
  function (err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
  }
);
