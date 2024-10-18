import { gerarToken } from '../utils/jwt.js'
import * as bd from '../repository/loginRepository.js'
import { Router } from 'express'

const endpoints = Router()

endpoints.post('/cadastrar', async (req, resp) => {
    try {
        let usuario = req.body
        let id = await bd.cadastrar(usuario)
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
        let usuario = req.body
        let resposta = await bd.verificarLogin(usuario)

        if (resposta) {
            let token = gerarToken(resposta)
            resp.send({
                "token": token
            })
        }
        else {
            resp.send({
                "mensagem": "email ou senha incorreto"
            })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete('/cadastro/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let resposta = await bd.deletarUsuario(id)
        if(resposta >= 1){
            resp.send({
                mensagem: "usuario deletado"
            })
        }
        else{
            resp.send({
                mensagem: "usuario não encontrado"
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