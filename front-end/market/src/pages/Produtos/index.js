import Sidebar from '../../componentes/Sidebar/Sidebar';
import { Typography, Button, Divider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import MediaCard from '../../componentes/CardProduto';
import './style.css';


function Produtos() {
    const history = useHistory();
    const auth = useAuth();
    const [erro, setErro] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [dados, setDados] = useState({})
    
    useEffect( () => {
        async function dadosUsuario() {
           
            try {
        
               const resp = await fetch('http://localhost:3000/perfil', {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'   
                    }
                });
               
                const  dados = await resp.json();
               
                if(resp.status === 200) {
                    setDados(dados);
                } else{
                    setErro(dados.erro);
                }   
            } catch (error) {
                setErro(error.message);
            }
        }

        dadosUsuario()
    }, [])
    
    useEffect( () => {
        async function listarProdutos() {
            
            try {
                const resposta = await fetch('http://localhost:3000/produtos', {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`,  
                    }
                });
            
                const  dadosResp = await resposta.json();

                setProdutos(dadosResp);
            } 
            catch(error) {
                setErro(error.message);
                return;
            }
        };
        
        listarProdutos();
    }, [auth.token, produtos]);


    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Typography variant="h4">{dados.nome_loja} </Typography>
                <h2> Seus produtos </h2>
                <div className='produtos'>
                    {produtos.map( p => {
                        return(
                            <MediaCard 
                                key={p.id}
                                id={p.id}
                                imagem={p.imagem}
                                nome={p.nome}
                                descricao={p.descricao}
                                estoque={p.estoque}
                                preco={p.preco}
                            />
                        )
                    })}
                </div>
                <Divider />

                <Button variant="contained" color="primary" onClick={() => history.push('/produtos/novo')}>Adicionar produto</Button>
                {erro && <Alert severity="error">{erro}</Alert>}

            </div>
        </div>
    )
}

export default Produtos;