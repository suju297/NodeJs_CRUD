const users = require('../helpers/').users

exports.create = function (req, res) {

    users.create(req).then(function (result) {
        res.json(result)
    }, function (error) {
        res.json(error);
        throw error;
    })
};

exports.read = function (req, res) {

    users.read(req).then(function (result) {
        res.json(result)
    }, function (error) {
        res.json(error);
        throw error;
    })
};

exports.update = function (req, res) {

    users.update(req).then(function (result) {
        res.json(result)
    }, function (error) {
        res.json(error);
        throw error;
    })
};

exports.delete = function (req, res) {

    users.delete(req).then(function (result) {
        res.json(result)
    }, function (error) {
        res.json(error);
        throw error;
    })
};

