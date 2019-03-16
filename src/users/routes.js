const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

router.post('/users', (req, res) => {
    if (req.body.password1 === req.body.password2) {
        User
        .create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password1, 10)
        })
        .then(user => {
            if (!user) {
                    return res.status(404).send({
                        message: `User undefined ;)`
                    })
                }
                return res.status(201).send(user)
            })
            .catch(error => res.status(400).send({
                message: error.message
            }))
    } else {
        return res.status(400).send({
            message: 'Passwords must match!'
        })
    }
})





module.exports = router
