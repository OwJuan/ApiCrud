const express = require('express');
const authMiddleware = require('../middlewares/auth');

class ProjectController {
    async index(request, response) {
        response.send({ ok: true, user: request.userId });
    }
}

module.exports = new ProjectController();