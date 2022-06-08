const { Router } = require('express');

const ProjectController = require('./app/controllers/ProjectController');
const UserController =  require('./app/controllers/UserController');
const CategoryController =  require('./app/controllers/CategoryController');

const router = Router();

router.get('/', ProjectController.index);

router.get('/teste', UserController.teste);
router.post('/auth/', UserController.auth);
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.delete('/users/:id', UserController.delete);
router.post('/users/', UserController.store);
router.put('/users/:id', UserController.update);

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);

module.exports =  router;