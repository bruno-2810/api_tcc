create database bd_techprocess;
use bd_techprocess;

create table tb_usuarios(
id_usuario int primary key auto_increment,
ds_email varchar(100),
ds_senha varchar(100)
);

create table tb_clientes (
id_cliente int auto_increment primary key,
id_usuario int,
nm_cliente varchar (200),
ds_telefone varchar (11),
ds_email varchar(200),
ds_endereco varchar (200),
dt_insercao date,
ft_cliente longblob,
	foreign key (id_usuario) references tb_usuarios(id_usuario)
);

create table tb_orcamentos (
id_orcamento int primary key auto_increment,
id_cliente int,
id_usuario int,
nm_orcamento varchar(100),
ds_orcamento varchar (200),
dt_realizacao date,
bt_finalizado boolean,
vl_valor decimal (10,2),
    foreign key (id_cliente) references tb_clientes(id_cliente),
	foreign key (id_usuario) references tb_usuarios(id_usuario)
);


insert into tb_usuarios (ds_email, ds_senha)
value ("brunin", "1234"),
	  ("braga", "4321"),
	  ("Ryan", "7777"),
	  ("Miguel", "4567"),
	  ("isabel", "8910");

PORTA=5100

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PWD=1234
MYSQL_DB=tcc


PORTA=5100

MYSQL_HOST=192.168.0.25
MYSQL_USER=infobmaster
MYSQL_PWD=Aluno2024!
MYSQL_DB=bd_techprocess
PORTA=5100

MYSQL_HOST=192.168.0.25
MYSQL_USER=admin
MYSQL_PWD=@dm!n
MYSQL_DB=bd_techprocess


PORTA=5016

MYSQL_HOST=localhost
MYSQL_USER=admin
MYSQL_PWD=@dm!n
MYSQL_DB=bd_techprocess
