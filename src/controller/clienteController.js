import { autenticar } from '../utils/jwt.js'
import * as bd from '../repository/clienteRepository.js'
import { Router } from 'express'

const endpoints = Router()

endpoints.post('/cliente', autenticar, async (req, resp) => {
    try {
        let cliente = req.body
        cliente.id = req.user.id
        let id = await bd.inserirCliente(cliente)
        resp.send({
            novoId: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/clientes', autenticar, async (req, resp) => {
    try {
        const idUsuario = req.user.id;
        const filtro = req.query.filtro; 
        let resposta = await bd.consultarClientes(idUsuario, filtro);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoints.get('/cliente/:id', autenticar, async (req, resp) =>{
    
    let id = req.params.id
    try {
        let cliente = await bd.consultarClientePorId(id)
        resp.send(cliente)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/cliente/:id', autenticar, async (req, resp) => {
    try {

        let cliente = req.body
        let id = req.params.id
        let resposta = await bd.alterarCliente(id, cliente)

        if (resposta >= 1) {
            resp.send()
        }
        else {
            resp.status(404).send({
                erro: 'nenhum registro encontrado'
            })
        }

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete('/cliente/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id
        let resposta = await bd.removerCliente(id)

        if (resposta >= 1){
            resp.send()
        }
        else{
            resp.status(404).send({
                erro: 'nenhum registro encontrado'
            })
        }
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})

export default endpoints;