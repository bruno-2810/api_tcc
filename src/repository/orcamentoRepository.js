import con from "./connection.js";

export async function inserirOrcamento(orcamento) {
    let comando = `
    insert into tb_orcamentos (id_cliente, id_usuario, nm_orcamento, ds_orcamento, dt_realizacao, bt_finalizado, vl_valor)
	values (?, ?, ?, ?, ?, ?, ?);
    `
    let resposta = await con.query(comando, [orcamento.cliente, orcamento.id, orcamento.titulo, orcamento.descricao, orcamento.realizacao, orcamento.finalizado, orcamento.valor])
    let info = resposta[0]

    return info.insertId
}

export async function consultarOrcamentos(id, filtro) {
    let comando = `
SELECT 
    o.id_orcamento  idOrcamento,
    o.nm_orcamento  titulo,
    c.nm_cliente    cliente,
    o.ds_orcamento  descricao,
    o.dt_realizacao realizacao,
    o.bt_finalizado finalizado,
    o.vl_valor  valor,
    c.nm_cliente    cliente
FROM 
    tb_orcamentos o
JOIN 
    tb_clientes c ON o.id_cliente = c.id_cliente
WHERE 
    o.id_usuario = ?;
    `
    
        if (filtro === 'a-z') {
            comando += ` order by nm_orcamento asc`;
        } else if (filtro === 'z-a') {
            comando += ` order by nm_orcamento desc`;
        } else if (filtro === 'recentes') {
            comando += ` order by dt_realizacao desc`;
        } else if (filtro === 'antigos') {
            comando += ` order by dt_realizacao asc`;
        }

    let resposta = await con.query(comando, [id])
    return resposta[0]
}

export async function buscarOrcamentoPorId(id) {
    let comando = `
    select  id_orcamento idOrcamento,
            id_cliente  idCliente,
            id_usuario  idUsuario,
            nm_orcamento    titulo,
            ds_orcamento    descricao,
            dt_realizacao   realizacao,
            vl_valor    valor
    from tb_orcamentos
    where id_orcamento = ?
    `
    let resposta = await con.query(comando, [id]);
    let info = resposta[0][0];
    return info;
}

export async function alterarOrcamento(id, orcamento) {
    let comando = `
    update tb_orcamentos
        set id_cliente = ?,
            id_usuario = ?,
            nm_orcamento = ?,
            ds_orcamento = ?,
            dt_realizacao = ?,
            vl_valor = ?
        where id_orcamento = ?
    `
    let resposta = await con.query(comando, [orcamento.cliente, orcamento.idUsuario, orcamento.titulo, orcamento.descricao, orcamento.realizacao, orcamento.valor, id])
    let info = resposta[0]

    return info.affectedRows
}

export async function removerOrcamento(id) {
    let comando = `
        delete from tb_orcamentos
            where id_orcamento = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]

    return info.affectedRows
} 