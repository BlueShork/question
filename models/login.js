let connection = require('../config/db');
let bcrypt = require('bcrypt');
let Inscription = require('./inscription');

class Login{


    constructor(result){
        this.result = result;
    }

    get email(){
        return this.result.email;
    }



    static login(email, password, error){

        
        connection.query('SELECT * FROM inscription', (err, exist) => {
            let result_array = exist.map((list) => list.email);
            if(Object.values(result_array).includes(email)){
                // True
                // Email exist in db
                connection.query('SELECT * FROM inscription WHERE email = ?', [email], (err, result) => {

                    let password_server = result[0].password;

                    bcrypt.compare(password, password_server, (err, value) => {
                        if(value === true){
                            // User authentificated
                            error(new Login(result[0]));
                        }
                        else{
                            // User has not the true password
                            error({error: "Une erreur est survenu"});
                        }
                       
                    })
                

            })
        }
            
        })


    }




}


module.exports = Login;