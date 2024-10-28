import './index.scss'
import '../../fonts.css'
import axios from 'axios';

import { useState } from 'react';

import {useNavigate} from "react-router-dom";

export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function Logar() {
        try {
            let body = {
                "email": email,
                "senha": senha
            }
            let resp = await axios.post('http://localhost:3010/login', body);
            
            if (resp && resp.data) {
                localStorage.setItem('TOKEN', resp.data.token);
                navigate('/toten');  // Redireciona para a página do tóten
            } else {
                console.error("A resposta não possui dados.", resp);
                alert("Erro ao fazer login, por favor tente novamente.");
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
            alert(err.response ? err.response.data.erro : "Erro ao fazer login, por favor tente novamente.");
        }
    }    
   

    return(
        <div className='login-page'>
            <div >
                <div className='logo' >
                    <h1 className='titulo'>Desfrut</h1>
                    <img src='./assets/images/logo.png'></img>
                </div>
              
                <h2 >area do adm</h2>
                <div className='login'>
                
                <form className='form'>
                    <div className='inputs'>
                        <label>Email : </label>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                    
                        <label>Senha : </label>
                        <input type='password' value={senha} onChange={e=> setSenha(e.target.value)}/>
                   </div>
                   
                </form>
                <div className='botao'>
                <button onClick={Logar}>LOGAR</button>
                </div>
            
            </div>
            </div>
        </div>
    );
}