import React, { useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useAuth from '../../hooks/useAuth';
import './style.css';

function Login () {
    const auth = useAuth();
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);



    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    };

    async function onSubmit(data) {
        setErro("");
        setCarregando(true);
        
        try {

           const resposta = await fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    'Content-Type': 'application/json'   
                }
            });
           
            const  dados = await resposta.json();

            setCarregando(false);
           
            if(resposta.status === 200) {
                auth.logar(dados, () => history.push('/produtos'));
            } else{
                setErro(dados.erro);
                return;
            }
            
        } catch (error) {
            setErro(error.message);
        }

        setCarregando(false);
    }

    return (
        <div className='content'>
            <div className='card'>
                <form autoComplete='off' noValidate className='form' onSubmit={handleSubmit(onSubmit)}> 
                   <Typography variant="h4">Login</Typography>
                    <TextField  label="E-mail" {...register('email', {required:true})} type='email'/>

                    <FormControl>
                        <InputLabel htmlFor="senha">Senha</InputLabel>
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
                            {...register('senha', {required:true})}
                        />  
                    </FormControl> 
                    <Button variant="contained" color="primary" type='submit'>
                        Entrar
                    </Button>
                    {carregando && <CircularProgress />}
                    {erro && <Alert severity="error">{erro}</Alert>}
                    <p>Primeira vez aqui? <NavLink to='/cadastro'> CRIE UMA CONTA </NavLink></p> 
                </form>
            </div> 
        </div>
    )
};

export default Login;