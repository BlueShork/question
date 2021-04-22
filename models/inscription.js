let mysql = require('mysql');
let connection = require('../config/db');
let bcrypt = require('bcrypt');
let saltRounds = 10;


class Inscription{

    constructor(user){
        this.user = user;
    }

    get email(){
        return this.user.email;
    }
    get password(){
        return this.user.password;
    }

    static read_user(cb){
        connection.query('SELECT * FROM inscription', (err, result) => {
            if(err) throw err;
            cb(result.map((user) => new Inscription(user)));
        })
    }

    static add(email, password, error){

        // Hash password with bcrypt

        bcrypt.hash(password, saltRounds, function(err, hash){
            const hash_password = hash;

            // verify if the account with this email adresse is not already register

            connection.query('SELECT * FROM inscription WHERE email = ?', [email], (err, result) => {
                if(err) throw err;

                console.log(result.map((user) => user.email));
                var email_result = result.map((user) => user.email);
                
                console.log(typeof(email_result))

                if(Object.values(email_result).includes(email)){
                    console.log("User is already register");
                    error('Eror');
                }
                else{
                    console.log("User has not already register");

                     connection.query('INSERT INTO inscription SET email = ?, password = ?', [email, hash_password], (err, result) => {
                        if(err) throw err;
                        error('Success');
                    });


                }

            })
        });


    }




}

module.exports = Inscription;