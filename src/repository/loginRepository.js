import con from "./connection.js";

export async function cadastrar (usuario) {
    let comando = `
    INSERT INTO tb_usuarios (ds_email, ds_senha)
         VALUES (?, ?)
    `
    let registro = await con.query(comando, [usuario.email, usuario.senha]) 
    let info = registro[0]

    return info.insertId
}

export async function consultarCadastros() {
    let comando = `
    SELECT id_usuario, ds_email, ds_senha
        FROM tb_usuarios
    `
    let resposta = await con.query(comando)
    return resposta
}

export async function verificarLogin(usuario) {
    let comando = `
    SELECT id_usuario   id,
            ds_email    email 
        FROM tb_usuarios
        WHERE ds_email = ? and ds_senha = ?
    `
    let resposta = await con.query(comando, [usuario.email, usuario.senha])
    return resposta[0][0]
}

export async function deletarUsuario (id) {
    let comando=`
    delete from tb_usuarios
        where id_usuario = ?
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}