create database market_cubos;

CREATE TABLE usuarios (
  id serial primary key,
  nome varchar(150) not null,
  nome_loja varchar(150) unique not null,
  email text unique not null,
  senha text not null
);

CREATE TABLE produtos (
  id serial primary key,
  usuario_id serial not null references usuarios (id),
  nome varchar(150) unique not null,
  estoque integer not null,
  categoria varchar(100) not null,
  preco integer not null,
  descricao text,
  imagem text
  );