create database tcc;
use tcc;

create table tb_clientes (
id_cliente int auto_increment primary key,
id_usuario int,
nm_cliente varchar (200),
ds_telefone varchar (11),
ds_email varchar(200),
ds_endereco varchar (200),
dt_insercao date,
	foreign key (id_usuario) references tb_usuarios(id_usuario)
);

create table tb_orcamentos (
id_orcamento int primary key auto_increment,
id_cliente int,
id_usuario int,
nm_orcamento varchar(100),
ds_orcamento varchar (200),
dt_realizacao date,
vl_valor decimal (10,2),
    foreign key (id_cliente) references tb_clientes(id_cliente),
	foreign key (id_usuario) references tb_usuarios(id_usuario)
);

create table tb_usuarios(
id_usuario int primary key auto_increment,
ds_email varchar(100),
ds_senha varchar(100)
);
