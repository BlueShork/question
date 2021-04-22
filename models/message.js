
let connection = require('../config/db');

class Message{

    static create(content, cb){

        connection.query('INSERT INTO messages SET content = ?, create_at = ?', [content, new Date()], (err, result) => {
            if(err) throw err
            cb(result);
        });



    }


}

module.exports = Message;