import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useStyles from './style';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Sidebar from "../../componentes/Sidebar/Sidebar";
import { 
    Button,
    Divider,
    TextField,
    InputAdornment,
    Typography
    } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

function ProdutoEditar() {
    const classes = useStyles();
    const auth = useAuth();
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [produto, setProduto] = useState([]);
    const { id } = useParams();

    useEffect( () => {
        async function listarProduto() {
            
            try {
                const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`,  
                    }
                });
            
                const  dados = await resposta.json();

                setProduto(dados);
            } 
            catch(error) {
                setErro(error.message);
                return;
            }
        };
        
        listarProduto();
    }, [auth.token, produto]);


    async function onSubmit(data) {
        setCarregando(true);
        const precoFormatado = Number(data.preco).toFixed(2)*100;
        const estoqueFormatado = Number(data.estoque);
        const produtoFormatado = {
            nome: data.nome,
            estoque: estoqueFormatado,
            categoria: data.categoria,
            preco: precoFormatado,
            descricao: data.descricao,
            imagem: data.imagem
        };
        console.log(produtoFormatado)
        try{
            const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
                method: 'PUT',
                body: JSON.stringify(produtoFormatado),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            const dados = await resposta.json();

            if(resposta.status === 200) {
                 history.push('/produtos');
            } 
        }
        catch(error) {
            setErro(error.message);
        }
       
    };

    return(
        <div className={classes.container}>
            <Sidebar />
            <div className={classes.main}>
                <Typography variant="h4">{auth.dadosUser.nome_loja}</Typography>
                <Typography variant='h6'>Editar produto</Typography>
                <form  autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <TextField  id='nome' label="Nome do produto" {...register('nome', {maxLength: 150})} type='text'/>                      
                    
                    <TextField
                        label="Preço"
                        id='preco'
                        placeholder='50.00'
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }}
                        {...register('preco')}
                        />
                        
                        <TextField
                        label="Estoque"
                        id="standard-start-adornment"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Un</InputAdornment>,
                        }}
                        {...register('estoque')}
                        />
                        
                        <TextField  label="Categoria" {...register('categoria', {maxLength:100})} type='text'/>
                        
                        <TextField  label="Descrição do produto" {...register('descricao')} type='text'/> 
                        
                        <TextField  label="Imagem" {...register('imagem')} type='text'/>     
                        
                        <Divider />
                    
                        <div className={classes.botoes}>
                            <NavLink to='/produtos'>CANCELAR</NavLink> 
                            <Button color='primary' variant="contained" type='submit'>Editar Produto</Button>
                        </div>  
                    
                        {carregando && <CircularProgress />}
                        {erro && <Alert severity="error">{erro}</Alert>}
                </form>     
            </div>
            <img src={produto.imagem} alt={produto.nome} className={classes.img}></img>
        </div>              
    )
}

export default ProdutoEditar;