import clienteController from './controller/clienteController.js'
import orcamentoController from './controller/orcamentoController.js'
import loginController from './controller/loginController.js'

export default function adicionarRota (servidor) {
    servidor.use(clienteController)
    servidor.use(orcamentoController)
    servidor.use(loginController)
}