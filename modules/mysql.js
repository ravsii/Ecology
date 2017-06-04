const mysql = require('mysql');

var db_config = {
  host: "127.0.0.1",
  user: "mysql",
  password: "mysql",
  database: "Ecology"
};

var con;

//Auto-disconnects fix
function handleDisconnect() {
  con = mysql.createConnection(db_config);
  
  con.connect((err) => {
    if(err) {
      //console.log('Connecting error:', err);
      setTimeout(handleDisconnect, 2000); //Retry
    }
  });
  
  con.on('error', function(err) {
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = con;