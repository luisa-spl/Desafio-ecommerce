const conexao = require('../conexao');
const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');
const editaUsuario = require('../utils/editarUsuario');

const pwd = securePassword();

const cadastrarUsuario = async (req, res) => {
    const { nome, email, nome_loja, senha  } = req.body;
    

    if (!nome) {
        return res.status(400).json('O campo nome é obrigatório');
    }

    if (!email) {
        return res.status(400).json('O campo e-mail é obrigatório');
    }

    if(!nome_loja) {
        return res.status(400).json('O campo "Nome da loja" é obrigatório');
    }

    if (!senha) {
        return res.status(400).json('O campo senha é obrigatório');
    }

    try {
        const usuario = await conexao.query('select * from usuarios where email = $1', [email]);

        if (usuario.rowCount > 0) {
            return res.status(400).json('E-mail já cadastrado')
        }
    } catch (error) {
        return res.status(400).json(error.message);
    }

    try {
        const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');
        const usuario = await conexao.query('insert into usuarios (nome, nome_loja, email, senha) values ($1, $2, $3, $4)', [nome, nome_loja, email, hash]);
        
        if (usuario.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar');
        }

        return res.status(200).json('Usuario cadastrado com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const mostrarUsuario = async (req, res) => {
    const { authorization } = req.headers;
    
    if(!authorization) {
        return res.status(400).json('O campo "token" é obrigatório');
    }

    try {
        
        const token = authorization.replace("Bearer", "").trim();

        const usuario = jwt.verify(token, jwtSecret);

        if(!usuario) {
            return res.status(400).json("Token inválido");
        }

        const perfil = await conexao.query('select * from usuarios where id = $1', [usuario.id]);

        const resposta = {
            id: perfil.rows[0].id,
            nome: perfil.rows[0].nome,
            email: perfil.rows[0].email,
            nome_loja: perfil.rows[0].nome_loja
        }

        return res.status(200).json(resposta);

    } catch (error) {
        return res.status(400).json(error.message)
    }
     
}

const editarUsuario = async (req, res) => {
    const { nome, email, nome_loja, senha } = req.body;
    const { authorization } = req.headers;
    
    if(!authorization) {
        return res.status(400).json('O campo "token" é obrigatório');
    }

    if(!nome && !nome_loja && !email && !senha) {
        return res.status(400).json("Ao menos 1 campo deve ser preenchido");
    }

    try {
        
        const token = authorization.replace("Bearer", "").trim();

        const resposta = jwt.verify(token, jwtSecret);

        if(!resposta) {
            return res.status(400).json("Token inválido");
        }

        const usuario = await conexao.query('select * from usuarios where email = $1', [email]);

        if(usuario.rowCount > 0) {
            return res.status(400).json("O e-mail já está cadastrado");
        }

        const usuarioAtualizado = await editaUsuario(nome, nome_loja, email, senha, resposta.id)
        
        if(usuarioAtualizado){
            return res.status(400).json(usuarioAtualizado);
        } 
        
        return res.status(200).json("Usuario editado com sucesso");
    }
    catch (error) {
        return res.status(400).json("Não foi possível atualizar");
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;
    
    if (!email) {
        return res.status(400).json('O campo e-mail é obrigatório');
    }

    if (!senha) {
        return res.status(400).json('O campo senha é obrigatório');
    }


    try {
        const usuarios = await conexao.query('select * from usuarios where email = $1', [email]);

        if (usuarios.rowCount === 0) {
            return res.status(400).json('E-mail ou senha incorretos')
        }

        const usuario = usuarios.rows[0];
        
        const resultado = await pwd.verify(Buffer.from(senha), Buffer.from(usuario.senha, 'hex'));
       
        switch (resultado) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json('E-mail ou senha incorretos');
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:
            
        
                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');
                    await conexao.query('update usuarios set senha = $1 where email = $2', [hash, email]);
                } catch (error) {
                    return res.status(400).json(error.message);
                }
                break;
        }
      

        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            nome_loja: usuario.nome_loja
        }, jwtSecret);

        const resposta = {
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                nome_loja: usuario.nome_loja
            },
            token: token
        };

                return res.status(200).json(resposta);
               
            } catch (error) {
                return res.status(400).json(error.message);
            }

};

module.exports = {
    cadastrarUsuario,
    mostrarUsuario,
    editarUsuario,
    login
};
