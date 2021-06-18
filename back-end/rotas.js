const express = require('express');
const produtos = require('./controladores/produtos');
const usuarios = require('./controladores/usuarios');

const rotas = express();

rotas.post('/cadastro', usuarios.cadastrarUsuario);
rotas.post('/login', usuarios.login);
rotas.get('/perfil', usuarios.mostrarUsuario);
rotas.put('/perfil', usuarios.editarUsuario);

rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.mostrarProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.editarProduto);
rotas.delete('/produtos/:id', produtos.deletarProduto);

module.exports = rotas;