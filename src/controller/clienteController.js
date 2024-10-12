import * as bd from '../repository/clienteRepository.js'
import { Router } from 'express'

const endpoints = Router()

endpoints.post('/cliente', async (req, resp) => {
    try {
        let cliente = req.body
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

endpoints.get('/clientes', async (req, resp) => {
    try {
        let resposta = await bd.consultarClientes()
        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/cliente/:id', async (req, resp) => {
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

endpoints.delete('/cliente/:id', async (req, resp) => {
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