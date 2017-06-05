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
  /*
  con.connect((err) => {
    if(err) {
      console.log('Connecting error:', err);
      setTimeout(handleDisconnect, 2000); //Retry
    }
  });
  */
  //con.query("SET SESSION wait_timeout = 3"); // 7 days timeout LUL
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