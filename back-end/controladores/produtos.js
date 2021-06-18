const conexao = require('../conexao');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');
const editaProduto = require('../utils/editarProduto');

const cadastrarProduto = async (req, res) => {
    const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(400).json('O campo "token" é obrigatório');
    }

    const token = authorization.replace("Bearer", "").trim();
  
    if (!nome) {
        return res.status(400).json('O campo nome é obrigatório');
    }

    if (!estoque) {
        return res.status(400).json('O campo estoque é obrigatório');
    }

    if(!categoria) {
        return res.status(400).json('O campo categoria é obrigatório');
    }

    if (!preco) {
        return res.status(400).json('O campo preço é obrigatório');
    }

    if(!token) {
        return res.status(400).json('O campo "token" é obrigatório');
    }

    try {
        const usuario = jwt.verify(token, jwtSecret);
    
        if(!usuario) {
            return res.status(400).json("Token inválido");
        }

        const produto = await conexao.query('insert into produtos (usuario_id, nome, estoque, categoria, preco, descricao, imagem) values ($1, $2, $3, $4, $5, $6, $7)', [usuario.id, nome, estoque, categoria, preco, descricao, imagem]);
        
        if (produto.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar');
        }

        return res.status(200).json('Produto cadastrado com sucesso');

    }
    catch(error) {
        return res.status(400).json(error.message);
    }
};

const listarProdutos = async (req, res) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(400).json('O campo "token" é obrigatório');
    }

    const token = authorization.replace("Bearer", "").trim();

    try {
        const usuario = jwt.verify(token, jwtSecret);
        
    
        if(!usuario) {
            return res.status(400).json("Token inválido");
        }

        const query = `select p.id, p.usuario_id, p.nome, p.estoque, p.categoria, p.preco, p.descricao, p.imagem from produtos p
        where p.usuario_id = $1`;
        
        const { rows: produtos }  = await conexao.query(query, [usuario.id]);

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const mostrarProduto = async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(400).json('O campo "token" é obrigatório');
    }

    const token = authorization.replace("Bearer", "").trim();

    if(!token) {
        return res.status(400).json('O campo "token" é obrigatório');
    }

    try {
        const usuario = jwt.verify(token, jwtSecret);

        if(!usuario) {
            return res.status(400).json("Token inválido");
        }

        const query = (`select p.id, p.usuario_id, p.nome, p.estoque, p.categoria, p.preco, p.descricao, p.imagem from produtos p
        where p.id = $1`)
        const produto  = await conexao.query(query, [id]);

        if(produto.rowCount === 0) {
            return res.status(404).json("Produto não encontrado");
        }

        
        if(produto.rows[0].usuario_id !== usuario.id) {
            return res.status(400).json("Este produto não pertence ao usuário");
        }
        
        return res.status(200).json(produto.rows[0]);

    } catch (error) {
        return res.status(400).json(error.message);
    }


};

const editarProduto = async (req, res) => {
    const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
    const { id } = req.params;
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(400).json('O campo "token" é obrigatório');
    }

    const token = authorization.replace("Bearer", "").trim();

   
    if(!token) {
        return res.status(400).json('O campo "token" é obrigatório');
    }

    try {
        const resposta = jwt.verify(token, jwtSecret);

        if(!resposta) {
            return res.status(400).json("Token inválido");
        }

        const query = ('select * from produtos where id = $1')
        const produto  = await conexao.query(query, [id]);

        if(produto.rowCount === 0) {
            return res.status(404).json("Produto não encontrado");
        }
        
        if(produto.rows[0].usuario_id !== resposta.id) {
            return res.status(400).json("O produto não pertence ao usuário");
        }

    } catch (error) {
        return res.status(400).json(error.message);
    }

    try {
        const produtoEditado = await editaProduto(nome, estoque, categoria, preco, descricao, imagem, id);
        
        if(produtoEditado){
            return res.status(400).json(produtoEditado);
        } 
        
        return res.status(200).json("Produto editado com sucesso");
        
    } catch(error) {
        return res.status(400).json(error.message);
    }
};

const deletarProduto= async (req, res) => {
    const { id }  = req.params;
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(400).json('O campo "token" é obrigatório');
    }

    const token = authorization.replace("Bearer", "").trim();
    

    try {
        const resposta = jwt.verify(token, jwtSecret);

        if(!resposta) {
            return res.status(400).json("Token inválido");
        }

        const query = ('select * from produtos where id = $1')
        const produto  = await conexao.query(query, [id]);

        if(produto.rowCount === 0) {
            return res.status(404).json("Produto não encontrado");
        }
        
        if(produto.rows[0].usuario_id !== resposta.id) {
            return res.status(400).json("O produto não pertence ao usuário");
        }

        
        const produtoExcluido = await conexao.query('delete from produtos where id = $1', [id]);

        if (produtoExcluido.rowCount === 0) {
            res.status(400).json("Não foi possível excluir");
        }

        return res.status(200).json('Produto excluido');
    } catch (error) {
        res.status(400).json(error.message);
    }

};

module.exports = {
    cadastrarProduto,
    listarProdutos,
    mostrarProduto,
    editarProduto,
    deletarProduto

}