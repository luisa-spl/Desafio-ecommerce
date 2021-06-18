const conexao = require('../conexao');
const securePassword = require('secure-password');
const pwd = securePassword();

const editaUsuario = async (nome, nome_loja, email, senha, id) => {
    try {
        if(nome) {
            const nomeAtualizado = await conexao.query(`update usuarios set nome = $1 where id = $2`, [nome, id]);

            if(nomeAtualizado.rowCount === 0) {
                return ("Não foi possível atualizar o campo 'nome'");
            }
        }

        if(nome_loja) {
            const lojaAtualizada = await conexao.query(`update usuarios set nome_loja = $1 where id = $2`, [nome_loja, id]);

            if(lojaAtualizada.rowCount === 0) {
                return ("Não foi possível atualizar o campo 'Nome da Loja'");
            }
        }

        if(email) {
            const emailAtualizado = await conexao.query(`update usuarios set email = $1 where id = $2`, [email, id]);

            if(emailAtualizado.rowCount === 0) {
                return ("Não foi possível atualizar o campo 'email'");
            }
        }

        if(senha) {
            const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');
            const senhaAtualizada = await conexao.query(`update usuarios set senha = $1 where id = $2`, [hash, id]);

            if(senhaAtualizada.rowCount === 0) {
                return ("Não foi possível atualizar o campo 'senha'");
            }
        }
    }
    catch(error) {
        return (error.message)
    }
};

module.exports = editaUsuario;