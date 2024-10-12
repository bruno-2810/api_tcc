import con from "./connection.js";

export async function inserirCliente (cliente) {
    let comando = `
    insert into tb_clientes (nm_cliente, ds_telefone, ds_email, ds_endereco, dt_insercao)
	values (?, ?, ?, ?, ?);
    `
    let resposta = await con.query (comando, [cliente.nome, cliente.telefone, cliente.email, cliente.endereco, cliente.insercao])
    let info = resposta[0]

    return info.insertId
}

export async function consultarClientes () {
    let comando = `
    select id_cliente   id,
        nm_cliente  nome,
        ds_telefone telefone,
        ds_email    email,
        ds_endereco endereco,
        dt_insercao insercao
    from tb_clientes
    `
    let resposta = await con.query(comando)
    let info = resposta[0]

    return info
}

export async function alterarCliente (id, cliente) {
    let comando = `
    update tb_clientes
        set nm_cliente = ?,
            ds_telefone = ?,
            ds_email = ?,
            ds_endereco = ?,
            dt_insercao = ?
        where id_cliente = ?;
    `
    let resposta = await con.query(comando, [cliente.nome, cliente.telefone, cliente.email, cliente.endereco, cliente.insercao, id])
    let info = resposta[0]

    return info.affectedRows
}

export async function removerCliente (id) {
    let comando = `
        delete from tb_clientes
            where id_cliente = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]

    return info.affectedRows
} 