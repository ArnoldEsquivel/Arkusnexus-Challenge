const express = require('express');
const router = express.Router();
const Account = require('../models/account.js');

router.put('/account_create', (req, res) => {
    const { account } = req.body

    Account.create(account)
        .then(() => res.send({
            status: 200,
            message: 'Account created successfully',
        }))
        .catch((err) => res.send({
            status: 400,
            message: 'Please try again later'
        }))
})

router.delete('/account_deactivate/:id', (req, res) => {
    const { id } = req.params

    Account.destroy({ where: { id: id } })
        .then(() => res.send({
            status: 200,
            message: 'Account deactivated successfully'
        }))
        .catch((err) => res.send({
            status: 400,
            message: 'Please try again later'
        }))
})

router.put('/account_activate/:id', (req, res) => {
    const { id } = req.params

    Account.restore({ where: { id: id } })
        .then(() => res.send({
            status: 200,
            message: 'Account activated successfully'
        }))
        .catch((err) => res.send({
            status: 400,
            message: 'Please try again later'
        }))
})

router.get('/account_get', (req, res) => {
    Account.findAll({ paranoid: false })
        .then((accounts) => res.send({
            status: 200,
            message: 'Account retrieved successfully',
            accounts: accounts
        }))
        .catch((err) => res.send({
            status: 400,
            message: err
        }))
})

module.exports = router