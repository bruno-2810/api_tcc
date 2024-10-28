import con from "./connection.js";

export async function inserirCliente(cliente) {
    let comando = `
    insert into tb_clientes (nm_cliente, id_usuario, ds_telefone, ds_email, ds_endereco, dt_insercao, ft_cliente)
values (?, ?, ?, ?, ?, ?, ?);
    `
    let resposta = await con.query(comando, [cliente.nome, cliente.id, cliente.telefone, cliente.email, cliente.endereco, cliente.insercao, cliente.foto])
    let info = resposta[0]

    return info.insertId
}

export async function consultarClientes(idUsuario, filtro) {
    let comando = `
    select id_cliente   id,
           nm_cliente   nome,
           id_usuario   idUsuario,
           ds_telefone  telefone,
           ds_email     email,
           ds_endereco  endereco,
           dt_insercao  insercao
    from tb_clientes
    where id_usuario = ?
    `;

    if (filtro === 'a-z') {
        comando += ` order by nm_cliente asc`;
    } else if (filtro === 'z-a') {
        comando += ` order by nm_cliente desc`;
    } else if (filtro === 'recentes') {
        comando += ` order by dt_insercao desc`;
    } else if (filtro === 'antigos') {
        comando += ` order by dt_insercao asc`;
    }

    let resposta = await con.query(comando, [idUsuario]);
    return resposta[0];
}


export async function consultarClientePorId(id) {
    let comando = `
    select 
        id_cliente as id,
        nm_cliente as nome,
        id_usuario as idUsuario,
        ds_telefone as telefone,
        ds_email as email,
        ds_endereco as endereco,
        dt_insercao as insercao,
        ft_cliente as foto
    from tb_clientes
    where id_cliente = ?;
    `;
    
    let resposta = await con.query(comando, [id]);
    let info = resposta[0][0];

    if (info.foto != null) {
        info.foto = info.foto.toString();
    }

    return info;
}


export async function alterarCliente(id, cliente) {
    let comando = `
    update tb_clientes
        set nm_cliente = ?,
            ds_telefone = ?,
            ds_email = ?,
            ds_endereco = ?,
            dt_insercao = ?,
            ft_cliente = ?
        where id_cliente = ?;
    `
    let resposta = await con.query(comando, [cliente.nome, cliente.telefone, cliente.email, cliente.endereco, cliente.insercao, cliente.foto, id])
    let info = resposta[0]

    return info.affectedRows
}

export async function removerCliente(id) {
    let comando = `
        delete from tb_clientes
            where id_cliente = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]

    return info.affectedRows
}