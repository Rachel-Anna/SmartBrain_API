const handleSignin = (db, bcrypt) => (req, res) =>{ //post is more secure so we use that
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
        return res.status(400).json('Incorrect form submission');
    }
    db.select('email','hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        console.log('this is the data', data);
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        console.log(isValid);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                console.log(user);
                res.json(user[0])
            })
            .catch(err => res.status(400).json("unable to get user"))
        } else {
            res.status(400).json("wrong credentials")
        }
    })
    .catch(err => res.status(400).json("wrong credentials"))
    //res.json("signing in") //from the express api, returns json string
    }

    module.exports = {
        handleSignin: handleSignin
    }
