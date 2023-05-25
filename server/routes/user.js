require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

router.put('/user_create', (req, res) => {
    const { user } = req.body

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            res.send({
                status: 400,
                message: 'Please try again later'
            })
        } else {
            user.password = hash

            User.create(user)
                .then(() => res.send({
                    status: 200,
                    message: 'User created successfully'
                }))
                .catch((err) => res.send({
                    status: 400,
                    message: 'Please try again later'
                }))
        }
    })
})

router.put('/user_reset_password', (req, res) => {
    let { password, id } = req.body

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.send({
                status: 400,
                message: 'Please try again later'
            })
        } else {
            password = hash

            User.update({ password: password }, { where: { id: id } })
                .then(() => res.send({
                    status: 200,
                    message: 'User updated successfully'
                }))
                .catch((err) => res.send({
                    status: 400,
                    message: 'Please try again later'
                }))
        }
    })
})

router.put('/user_login', (req, res) => {
    const { email, password } = req.body

    User.findOne({ where: { email: email } })
        .then((user) => {
            if (user == null) {
                res.send({
                    status: 400,
                    message: 'Cant find email'
                })
            } else {
                bcrypt.compare(password, user.dataValues.password, (err, result) => {
                    if (err) {
                        res.send({
                            status: 400,
                            message: 'Password is incorrect'
                        })
                    } else if (result) {
                        const secret = process.env.SECRET_KEY
                        const token = jwt.sign({ email: user.email, userId: user.id }, secret, { expiresIn: '3h' });

                        res.send({
                            status: 200,
                            message: 'User logged in successfully',
                            user: {
                                id: user.id,
                                username: user.username,
                                type_id: user.type_id,
                                account_id: user.account_id,
                                account_rol: user.account_rol,
                            },
                            token: token
                        })
                    } else {
                        res.send({
                            status: 400,
                            message: 'Email or password is incorrect'
                        })
                    }
                })
            }
        }).catch((err) => res.send({
            status: 400,
            message: 'Please try again later'
        }))
})

router.put('/verify_token', (req, res) => {
    const { token, user } = req.body
    const secret = process.env.SECRET_KEY

    try {
        const decoded = jwt.verify(token, secret)
        res.send({
            status: 200,
            message: 'Token is valid',
            user: user,
            token: token
        })
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            const newToken = jwt.sign({ email: user.email, userId: user.id }, secret, { expiresIn: '3h' });
            res.send({
                status: 200,
                message: 'Token is refreshed',
                user: user,
                token: newToken
            })
        } else {
            res.send({
                status: 400,
                message: 'Token is invalid'
            })
        }
    }
})


router.put('/user_update', (req, res) => {
    const { newUser } = req.body

    User.update(newUser, { where: { id: newUser.id } })
        .then(() => res.send({
            status: 200,
            message: 'User updated successfully'
        }))
        .catch((err) => res.send({
            status: 400,
            message: 'Please try again later'
        }))
})

router.delete('/user_deactivate/:id', (req, res) => {
    const { id } = req.params

    User.destroy({ where: { id: id } })
        .then(() => res.send({
            status: 200,
            message: 'User deactivated successfully'
        }))
        .catch((err) => res.send({
            status: 400,
            message: 'Please try again later'
        }))
})

router.put('/user_activate/:id', (req, res) => {
    const { id } = req.params

    User.restore({ where: { id: id } })
        .then(() => res.send({
            status: 200,
            message: 'User activated successfully'
        }))
        .catch((err) => res.send({
            status: 400,
            message: 'Please try again later'
        }))
})

router.put('/user_reset_password', (req, res) => {
    const { user } = req.body

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            res.send({
                status: 400,
                message: 'Please try again later'
            })
        } else {
            user.password = hash

            User.update(user, { where: { id: user.id } })
                .then(() => res.send({
                    status: 200,
                    message: 'User updated successfully'
                }))
                .catch((err) => res.send({
                    status: 400,
                    message: 'Please try again later'
                }))
        }
    })
})

router.delete('/user_delete', (req, res) => {
    const { id } = req.body

    User.destroy({ where: { id: id } })
        .then(() => res.send({
            status: 200,
            message: 'User deleted successfully'
        }))
        .catch((err) => res.send({
            status: 400,
            message: 'Please try again later'
        }))
})

router.get('/user_get', (req, res) => {
    User.findAll({
        include: [{
            association: 'account',
            attributes: ['id', 'account_name', 'client_name']
            // }, {
            //     association: 'role',
            //     attributes: ['id', 'user_type']
        }],
        paranoid: false
    })
        .then((users) => res.send({
            status: 200,
            message: 'User retrieved successfully',
            users: users
        }))
        .catch((err) => res.send({
            status: 400,
            message: err
        }))
})

router.put('/get_manager_account', (req, res) => {
    const { id } = req.body

    User.findOne({
        where: { id: id },
        attributes: ['id', 'username'],
    })
        .then((manager) => res.send({
            status: 200,
            message: 'User retrieved successfully',
            manager: manager
        }))
        .catch((err) => res.send({
            status: 400,
            message: err
        }))
})

router.put('/team_members_count', (req, res) => {
    const { id } = req.body

    User.count({ where: { account_id: { [Op.eq]: id } } })
        .then((count) => res.send({
            status: 200,
            message: 'Team members count retrieved successfully',
            count: count
        }))
        .catch((err) => res.send({
            status: 400,
            message: err
        }))
})

router.put('/team_get', (req, res) => {
    const { id } = req.body

    User.findAll({
        where: { account_id: { [Op.eq]: id } },
    })
        .then((users) => res.send({
            status: 200,
            message: 'Team retrieved successfully',
            users: users
        }))
        .catch((err) => res.send({
            status: 400,
            message: err
        }))
})


module.exports = router
