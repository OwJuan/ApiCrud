const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../../config/auth.json");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

class UserController {
  async index(request, response) {
    //Listar todos os registros
    const { orderBy } = request.query;
    const users = await UserRepository.findAll(orderBy);

    response.json(users);
  }

  async show(request, response) {
    //Obter um usuario
    const { id } = request.params;
    const user = await UserRepository.findById(id);

    if (!user) {
      //404 Not found
      return response.status(404).json({ error: "User not found" });
    }

    response.json(user);
  }

  async store(request, response) {
    //Criar novo registro
    const { email, password, category_id } = request.body;

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      return response
        .status(400)
        .json({ error: "This e-mail is already in use" });
    }

    const user = await UserRepository.create({
      email,
      password,
      category_id,
    });
    response.status(201).json({
      user,
      token: generateToken({ id: user.id }),
    });
  }

  async update(request, response) {
    //Editar um registro
    const { id } = request.params;
    const { email, password, category_id } = request.body;

    const userExists = await UserRepository.findById(id);
    if (!userExists) {
      return response.status(404).json({ error: "User not found " });
    }

    const userByEmail = await UserRepository.findByEmail(email);
    if (userByEmail && userByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: "This e-mail is already in use" });
    }

    const user = await UserRepository.update(id, {
      email,
      password,
      category_id,
    });

    response.json(user);
  }

  async delete(request, response) {
    //Deletar um usuario
    const { id } = request.params;

    await UserRepository.delete(id);
    //204: No Content
    response.sendStatus(204);
  }

  async auth(request, response) {
    //autenticação LOGIN

    const { email, password } = request.body;

    const user = await UserRepository.findOne({ email, password });

    if (!user) return response.status(400).json({ error: "User not found" });

    // if (!await bcrypt.compare(password, user.password))
    // return response.status(400).json({ error: 'Invalid password' });

    // user.password = undefined;

    if (user) {
      return response.json({
        user,
        token: generateToken({ id: user.id }),
      });
    }
    return response.json({ error: "User Invalid" });
  }
}

// Singleton

module.exports = new UserController();
