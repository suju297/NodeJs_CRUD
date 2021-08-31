module.exports = function(app){

    const users_controller = require('../controllers/users.controllers')

    app.post('/create', users_controller.create);

    app.get('/read/:id', users_controller.read);

    app.put('/update', users_controller.update);

    app.delete('/delete/:id', users_controller.delete);
}