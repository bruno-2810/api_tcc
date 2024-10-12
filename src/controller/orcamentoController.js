import * as bd from '../repository/orcamentoRepository.js'
import { Router } from 'express'

const endpoints = Router()

endpoints.post('/orcamento', async (req, resp) => {
    try {
        let orcamento = req.body
        let id = await bd.inserirOrcamento(orcamento)
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

endpoints.get('/orcamentos', async (req, resp) => {
    try {
        let resposta = await bd.consultarOrcamentos()
        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/orcamento/:id', async (req, resp) => {
    try {

        let orcamento = req.body
        let id = req.params.id
        let resposta = await bd.alterarOrcamento(id, orcamento)

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

endpoints.delete('/orcamento/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let resposta = await bd.removerOrcamento(id)

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