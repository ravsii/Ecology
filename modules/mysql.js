const mysql = require('mysql');

const db_config = {
  host: "127.0.0.1",
  user: "mysql",
  password: "mysql",
  database: "Ecology"
};

var con;

//Auto-disconnects fix
function handleDisconnect() {
  con = mysql.createPool(db_config);
  con.on('error', function(err) {
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
      console.log('working');
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = con;