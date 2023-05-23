const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

    User.findOne({ where: { id: id } })
        .then((user) => res.send({
            status: 200,
            message: 'User retrieved successfully',
            user: user
        }))
        .catch((err) => res.send({
            status: 400,
            message: err
        }))
})

router.put('/team_members_count', (req, res) => {
    const { id } = req.body

    User.count({ where: { account_id: id } })
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

module.exports = router
