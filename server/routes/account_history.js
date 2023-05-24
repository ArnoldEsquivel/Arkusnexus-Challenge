const express = require('express')
const router = express.Router()
const AccountHistory = require('../models/account_history')
const { Op } = require('sequelize')

router.put('/account_history_create', (req, res) => {
    const { account_history } = req.body

    AccountHistory.create(account_history)
        .then(() => res.send({
            status: 200,
            message: 'Account History created successfully'
        }))
        .catch((err) => res.send({
            status: 400,
            message: 'Please try again later'
        }))
})

router.put('/account_history_update', (req, res) => {
    const { account_history } = req.body

    AccountHistory.update(account_history, { where: { id: account_history.id } })
        .then(() => res.send({
            status: 200,
            message: 'Account History updated successfully'
        }))
        .catch((err) => res.send({
            status: 400,
            message: 'Please try again later'
        }))
})

router.delete('/account_history_delete', (req, res) => {
    const { id } = req.body

    AccountHistory.destroy({ where: { id: id } })
        .then(() => res.send({
            status: 200,
            message: 'Account History deleted successfully'
        }))
        .catch((err) => res.send({
            status: 400,
            message: 'Please try again later'
        }))
})

router.get('/account_history_get', (req, res) => {
    const { id } = req.body

    AccountHistory.findAll({
        where: { account_id: { [Op.eq]: id } },
        paranoid: false
    })
        .then((history) => res.send({
            status: 200,
            message: 'Account History retrieved successfully',
            history: history
        }))
        .catch((err) => res.send({
            status: 400,
            message: err
        }))
})

module.exports = router