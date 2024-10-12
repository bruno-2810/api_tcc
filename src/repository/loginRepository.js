import con from "./connection.js";
import bcrypt from 'bcrypt';

// Função de cadastro com criptografia de senha
export async function cadastrar (cadastro) {
    const saltRounds = 10; // Define a complexidade da criptografia
    const senhaCrip = await bcrypt.hash(cadastro.senha, saltRounds) //criptografa a senha

    let comando = `
    INSERT INTO tb_login (ds_email, pwd_senha)
         VALUES (?, ?)
    `
    let registro = await con.query(comando, [cadastro.email, senhaCrip]) //armazena a senha criptografada
    let info = registro[0]

    return info.insertId
}

export async function consultarCadastros() {
    let comando = `
    SELECT id_login, ds_email, pwd_senha
        FROM tb_login
    `
    let resposta = await con.query(comando)
    return resposta
}

//função de login que verifica a senha criptografada 
export async function verificarLogin(cadastro) {
    let comando = `
    SELECT pwd_senha 
        FROM tb_login
        WHERE ds_email = ?
    `
    let [resposta] = await con.query(comando, [cadastro.email])
    let senhaArmazenada = resposta[0].pwd_senha

    // Comparar a senha fornecida com o hash armazenado
    const senhaValidada = await bcrypt.compare(cadastro.senha, senhaArmazenada)

    if(senhaValidada){
        return true
    }
    else{
        return false
    }
}