import React, { useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);


    function handleClickShowPassword() {
        setShowPassword(!showPassword);
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

           const resposta = await fetch('https://desafio-m03.herokuapp.com/cadastro', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                }
            });
            setCarregando(true);
            const dados = await resposta.json();
          

            if (!resposta.ok) {
                setErro(dados.erro);
                return;
            }
            
            console.log(dados);
        } catch (error) {
            console.log(error.message);
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
                    <TextField id="nome" label="Nome" {...register('nome', {required:true})}/>
                    <TextField id="nome-loja" label="Nome da loja" {...register('nome-loja', {required:true})}/>
                    <TextField id="email" label="E-mail" {...register('email', {required:true})}/>
                    {errors.email?.type === 'required' && <span style={{color:'red'}}>O campo e-mail é obrigatório</span>}
                    <InputLabel htmlFor="senha">Senha</InputLabel>
                    <Input
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
                     {errors.senha?.type === 'required' && <span style={{color:'red'}}>O campo senha é obrigatório</span>}

                     <InputLabel htmlFor="senha">Repita a senha</InputLabel>
                     <Input
                        id="repetirSenha"
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
                        {...register('repetirSenha', {required:true})}
                    />
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