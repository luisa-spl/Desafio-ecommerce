import React, { useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './style.css';

function Cadastro() {
    const history = useHistory();
    const { register, formState: {errors}, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRep, setShowPasswordRep] = useState(false);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);


    function handleClickShowPassword() {
        setShowPassword(!showPassword);
      };

    function handleClickShowPasswordRep() {
    setShowPasswordRep(!showPasswordRep);
    };

    async function onSubmit(data) {
        setErro("");
        setCarregando(false);

        if(data.senha !== data.repetirSenha) {
            setErro("As senhas digitadas são diferentes");
            return;
        }

        try {
            delete data.repetirSenha;
            console.log(data);
           const resposta = await fetch('http://localhost:3000/cadastro', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                }
            });
            setCarregando(true);


            const dados = await resposta.json();
          

            if (!resposta.ok) {
                setErro(dados.erro);
                return;
            }
            
            
        } catch (error) {
            setErro(error.message);
        }
        
        setCarregando(false);
        history.push('/');
    }

    return (
        <div className='contentC'>
            <div className='cardC'>
                <form autoComplete='off'  className='formC' onSubmit={handleSubmit(onSubmit)}>
                    <h2>Criar uma conta</h2>
                    <InputLabel required htmlFor="nome">Nome</InputLabel>
                    <TextField  required id="nome" size='small' {...register('nome')}/>

                    <InputLabel required htmlFor="nome-loja">Nome da Loja</InputLabel>
                    <TextField required id="nome-loja" size='small' {...register('nome_loja', {required:true})}/>

                   
                    <InputLabel required htmlFor="email">Email</InputLabel>
                    <TextField required id="email" size='small' {...register('email', {required:true})}/>
                    
                    {errors.email?.type === 'required' && <span style={{color:'red'}}>O campo e-mail é obrigatório</span>}
                    
                    <FormControl>
                        <InputLabel required htmlFor="senha">Senha</InputLabel>
                        <Input
                        size='small'
                            id="senha"
                            label='senha'
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
                            {...register('senha', {required:true})}
                        />
                    </FormControl>
                     {errors.senha?.type === 'required' && <span style={{color:'red'}}>O campo senha é obrigatório</span>}
                    
                    <FormControl>
                        <InputLabel required htmlFor="senha">Repita a senha</InputLabel>
                        <Input
                            size='small'
                            id="repetirSenha"
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
                            {...register('repetirSenha', {required:true})}
                        />
                    </FormControl>
                     {errors.repetirSenha?.type === 'required' && <span style={{color:'red'}}>O campo senha é obrigatório</span>}
                    <Button variant="contained" color="primary" type='submit'>
                        Criar Conta
                    </Button>
                    {carregando && <CircularProgress />}
                    {erro && <Alert severity="error">{erro}</Alert>}
                    <p>Já possui uma conta? <NavLink to='/'> ACESSE </NavLink></p>
                </form>
            </div> 
        </div>
    )
};

export default Cadastro;