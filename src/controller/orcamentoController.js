import { autenticar } from '../utils/jwt.js'
import * as bd from '../repository/orcamentoRepository.js'
import { Router } from 'express'

const endpoints = Router()

endpoints.post('/orcamento', autenticar, async (req, resp) => {
    try {
        let orcamento = req.body
        orcamento.id = req.user.id
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

endpoints.get('/orcamentos', autenticar, async (req, resp) => {
    try {
        const id = req.user.id
        const filtro = req.query.filtro
        let resposta = await bd.consultarOrcamentos(id, filtro)
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/orcamento/:id', autenticar, async (req, resp) => {
    let id = req.params.id

try {
        let servico = await bd.buscarOrcamentoPorId(id)
        resp.send(servico)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/orcamento/:id', autenticar, async (req, resp) => {
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

endpoints.delete('/orcamento/:id', autenticar, async (req, resp) => {
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