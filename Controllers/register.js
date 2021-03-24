

//REGISTER
const handleRegister = (db, bcrypt) => (req, res, ) => {
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash, //first column in the db column, 2nd is from line 72
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit) //comamand to execute all the transactions
            .catch(trx.rollback)//in case anything fails
        })
        .catch(err => res.status(400).json('unable to register')); //we dont wanna give away anything to the client so we don't return error type (err)
}

module.exports = {
    handleRegister: handleRegister
} 
