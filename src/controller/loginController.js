import * as bd from '../repository/loginRepository.js'
import { Router } from 'express'

const endpoints = Router()

endpoints.post('/cadastrar', async (req, resp) => {
    try {
        let cadastro = req.body
        let id = await bd.cadastrar(cadastro)
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

endpoints.get('/cadastros', async (req, resp) => {
    try {
        let resposta = await bd.consultarCadastros()
        resp.send(resposta)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/login', async (req, resp) => {
    try {
        let cadastro = req.body
        let resposta = await bd.verificarLogin(cadastro)

        if(resposta){
            resp.send({
                mensagem: "login bem-sucedido"
            })
        }
        else{
            resp.send({
                mensagem: "email ou senha incorretos"
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