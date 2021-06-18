const conexao = require('../conexao');

const editaProduto = async (nome, estoque, categoria, preco, descricao, imagem, id) => {
    try {
        if(nome) {
            const nomeAtualizado = await conexao.query(`update produtos set nome = $1 where id = $2`, [nome, id]);

            if(nomeAtualizado.rowCount === 0) {
                return ("Não foi possível atualizar o campo 'nome'");
            }
        }

        if(estoque) {
            const estoqueAtualizado = await conexao.query(`update produtos set estoque = $1 where id = $2`, [estoque, id]);

            if(estoqueAtualizado.rowCount === 0) {
                return ("Não foi possível atualizar o campo 'estoque'");
            }
        }

        if(categoria) {
            const catAtualizada = await conexao.query(`update produtos set categoria = $1 where id = $2`, [categoria, id]);

            if(catAtualizada.rowCount === 0) {
                return ("Não foi possível atualizar o campo 'categoria'");
            }
        }

        if(preco) {
            const precoAtualizado = await conexao.query(`update produtos set preco = $1 where id = $2`, [preco, id]);

            if(precoAtualizado.rowCount === 0) {
                return ("Não foi possível atualizar o campo 'preco'");
            }
        }

        if(descricao) {
            const descAtualizada = await conexao.query(`update produtos set descricao = $1 where id = $2`, [descricao, id]);

            if(descAtualizada.rowCount === 0) {
                return ("Não foi possível atualizar o campo 'descricao'");
            }
        }

        if(imagem) {
            const imgAtualizada = await conexao.query(`update produtos set imagem = $1 where id = $2`, [imagem, id]);

            if(imgAtualizada.rowCount === 0) {
                return ("Não foi possível atualizar o campo 'imagem'");
            };
        }
    }
    catch(error) {
        return (error.message)
    }
};

module.exports = editaProduto;