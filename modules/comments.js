const mysql = require(__basePath + '/modules/mysql.js');

const comments = () => {};

comments.load = (id, type, callback) => {
  mysql.query('SELECT `comments`.*, `users`.`login` FROM `comments` LEFT JOIN `users` ON (comments.id_author = users.id) WHERE `type` = ? AND `id_parent` = ? ORDER BY `comments`.`id` DESC;', [type, id], (err, commentsDB) => {
    if(typeof commentsDB === 'undefined' || commentsDB.length === 0) commentsDB = false;
    callback({
      id: id,
      type: type,
      comments: commentsDB
    });
  });
}

module.exports = comments;