const UserRepository = require("./repositories/UserRepository");

class UserController {
    async index(request, response) {
        //Listar todos os registros
        const { orderBy } = request.query;
        const users = await  UserRepository.findAll(orderBy);

        response.json(users)
    }

    async show(request, response) {
        //Obter um usuario
        const { id } = request.params;
        const user = await UserRepository.findById(id);

        if(!user){
            //404 Not found
            return response.status(404).json({ error: 'User not found' });
        }

        response.json(user);
    }

    async store(request, response) {
        //Criar novo registro
        const {
            name, email, password, category_id,
        } = request.body;

        if(!name) {
            return response.status(400).json({ error: 'Name is required' });
        }

        const userExists = await UserRepository.findByEmail(email);

        if (userExists) {
            return response.status(400).json({ error: 'This e-mail is already in use' });
        }

        const user = await UserRepository.create({
            name, email, password, category_id,
        });
        response.status(201).json(user)
    }

    async update(request, response) {
        //Editar um registro
        const { id } =  request.params;
        const{
            name, email, password, category_id,
        } = request.body;

        const userExists = await UserRepository.findById(id);
        if(!userExists) {
            return response.status(404).json({ error: 'User not found '});
        }

        if(!name) {
            return response.status(400).json({ error: 'Name is Required '});
        }

        const userByEmail = await UserRepository.findByEmail(email);
        if(userByEmail && userByEmail.id !== id) {
            return response.status(400).json({ error: 'This e-mail is already in use'});
        }

        const user = await UserRepository.update(id, {
            name, email, password, category_id,
        });
        
        response.json(user)
    }

    async delete(request, response) {
        //Deletar um usuario
        const { id } = request.params;

        await UserRepository.delete(id);
        //204: No Content
        response.sendStatus(204);
    }
}

// Singleton

module.exports = new UserController();