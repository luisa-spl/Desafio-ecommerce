import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Sidebar from "../../componentes/Sidebar/Sidebar";
import { 
    Button,
    Divider,
    TextField,
    InputAdornment
    } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import useStyles from './style';
import useAuth from '../../hooks/useAuth';


function ProdutoNovo() {
    const auth = useAuth();
    const history = useHistory();
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

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
        
        try {
            const resposta = await fetch('http://localhost:3000/produtos', {
                method: 'POST',
                body: JSON.stringify(produtoFormatado),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            const dados = await resposta.json();

            if(resposta.status === 200) {
                 history.push('/produtos');
            } else{
                setErro(dados.erro);
                return;
            }
        }
        catch(error) {
            setErro(error.message);
        }
        
    }

    return(
        <div className={classes.container}>
            <Sidebar />
            <div className={classes.main}>
                <h1>{auth.dadosUser.nome_loja}</h1>
                <h2> Adicionar Produto </h2>
                <div >
                    <form  noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <TextField  id='nome' label="Nome do produto" {...register('nome', {required:true, maxLength: 150})} type='text'/>                      
                            <TextField
                            label="Preço"
                            id='preco'
                            placeholder='50.00'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                            }}
                            {...register('preco', {required: true})}
                            />
                            <TextField
                            label="Estoque"
                            id="standard-start-adornment"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Un</InputAdornment>,
                            }}
                            {...register('estoque', {required:true})}
                            />
                            <TextField  label="Categoria" {...register('categoria', {required:true, maxLength:100})} type='text'/>
                            <TextField  label="Descrição do produto" {...register('descricao', {required:true})} type='text'/> 
                            <TextField  label="Imagem" {...register('imagem', {required:true})} type='text'/>     
                            <Divider />
                            <div className={classes.botoes}>
                                <NavLink to='/produtos'>CANCELAR</NavLink> 
                                <Button color='primary' variant="contained" type='submit'>Adicionar Produto</Button>
                            </div>  
                            {carregando && <CircularProgress />}
                            {erro && <Alert severity="error">{erro}</Alert>}
                    </form>              
                </div>        
            </div> 
        </div>
    )
}

export default ProdutoNovo;