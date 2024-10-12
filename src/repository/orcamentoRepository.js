import con from "./connection.js";

export async function inserirOrcamento (orcamento) {
    let comando = `
    insert into tb_orcamentos (id_cliente, nm_orcamento, ds_orcamento, dt_realizacao, vl_valor)
	values (?, ?, ?, ?, ?);
    `
    let resposta = await con.query (comando, [orcamento.cliente, orcamento.titulo, orcamento.descricao, orcamento.realizacao, orcamento.valor])
    let info = resposta[0]

    return info.insertId
}

export async function consultarOrcamentos () {
    let comando = `
    select id_orcamento idOrcamento,
            id_cliente  idCliente,
            nm_orcamento    titulo,
            ds_orcamento    descricao,
            dt_realizacao   realizacao,
            vl_valor    valor
    from tb_orcamentos
    `
    let resposta = await con.query(comando)
    let info = resposta[0]

    return info
}

export async function alterarOrcamento (id, orcamento) {
    let comando = `
    update tb_orcamentos
        set id_cliente = ?,
            nm_orcamento = ?,
            ds_orcamento = ?,
            dt_realizacao = ?,
            vl_valor = ?
        where id_orcamento = ?;
    `
    let resposta = await con.query(comando, [orcamento.cliente, orcamento.descricao, orcamento.realizacao, orcamento.valor, id])
    let info = resposta[0]

    return info.affectedRows
}

export async function removerOrcamento (id) {
    let comando = `
        delete from tb_orcamentos
            where id_orcamento = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]

    return info.affectedRows
} 