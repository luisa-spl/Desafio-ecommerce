import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Sidebar from '../../componentes/Sidebar/Sidebar';
import useStyles from './style';
import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
    Button,
    Divider,
    TextField,
    Input,
    InputLabel,
    InputAdornment,
    IconButton,
    FormControl,
    Typography
    } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';


function PerfilEditar() {
    const classes = useStyles();
    const history = useHistory();
    const auth = useAuth();
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRep, setShowPasswordRep] = useState(false);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [dados, setDados] = useState({});
    
    
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
    }, [auth.token])
    

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    };

    function handleClickShowPasswordRep() {
        setShowPasswordRep(!showPasswordRep);
    };

    async function onSubmit(data) {
        setErro("");
        setCarregando(false);
        
        if(data.senha !== data.senhaRepetida) {
            setErro("As senhas digitadas são diferentes");
            return;
        }

        try {
            delete data.senhaRepetida;
            
            setCarregando(true);
            const resposta = await fetch('http://localhost:3000/perfil', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            
            const dadosResp = await resposta.json();
          
            
            if (resposta.ok) {
                history.push('/perfil');
            } else {
                setCarregando(false);
                setErro(dadosResp);
            }
        }
        catch(error) {
            setErro(error.message);
        }

        setCarregando(false);
    }


    return(
        <div className={classes.container}>
            <Sidebar />
            <div className={classes.main}>
            <Typography variant="h4">{dados.nome_loja}</Typography>
                <Typography variant='h5'>Perfil</Typography>
                <form  noValidate autoComplete="off"  className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    
                    <TextField  size='small' id='nome' label="Seu nome" type='text' {...register('nome')} /> 

                    <TextField  size='small' id='nome_loja' label="Nome da Loja" type='text' {...register('nome_loja')} />  

                    <TextField  size='small' id='email' label="E-mail" type='text' {...register('email')} />  

                    <FormControl>
                    <InputLabel htmlFor="senha">Nova Senha</InputLabel>
                    <Input  
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        {...register('senha')}
                    /> 
                    </FormControl>

                    <FormControl>
                    <InputLabel htmlFor="senhaRepetida">Repetir Nova Senha</InputLabel>
                    <Input  
                        type={showPasswordRep ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordRep}
                                >
                                {showPasswordRep ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        {...register('senhaRepetida')}
                    /> 
                    </FormControl> 

                    <Divider />
                    
                    <div className={classes.botoes}>
                        <NavLink to='/perfil'> CANCELAR </NavLink>
                        <Button color='primary' variant="contained" type='submit'>Editar Perfil</Button>
                        
                        {carregando && <CircularProgress />}
                    </div> 
                </form>
                {erro ?? <Alert variant="filled" severity="error" className={classes.alert}>{erro}</Alert>}
            </div>
        </div>
    );
};

export default PerfilEditar;