
class PedingController { 
    //AQUI VAI A CRIAÇÃO E CONTROLE DE PEDIDOS

    async store(request, response){
        response.send('HELLO WORLD');
    }
}

module.exports = new PedingController();
