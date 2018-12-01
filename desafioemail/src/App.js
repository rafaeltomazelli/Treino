import React, { Component } from 'react';
import Input from './Input/Input';
import { Style } from './App.style';


class App extends Component { //usando neste programa os valores do input do email, da senha e um token para dar o aviso de inválido
  state = {
    email: '',
    password: '',
  };

  inputChangedHandler = (event) => { //este handler pega o valor do nome do forms como direção para atualizar o objeto
    this.setState({ [event.target.name]: event.target.value });
  }

  evalTests = (event) => {  //usa regex e duas variáveis para avaliar o email e senha como definido, seria possível fazer sem variáveis ?
    event.preventDefault()
    let se = /^\S*(?=.*[A-Za-z])\S*(?=.*\d)\S*[A-Za-z\d]\S*$/.test(this.state.password) && this.state.password.length >= 7
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(this.state.email)
    
    this.setState({ validState: re && se });
  }

  loadingHandler = (event) =>{
    event.preventDefault()
    this.setState({isLoading: true})
    console.log ('fui executado')
  }

  render() {
    return (
    <form style={Style.general} onSubmit ={this.loadingHandler} /*{this.evalTests}*/>
    {console.log(this.state.isLoading)}
        <Input name='email' type='email' value={this.state.email} changed={this.inputChangedHandler}  />
        <Input name='password' type='password' value={this.state.password} changed={this.inputChangedHandler}/>
        <button style={Style.btn}>Entrar</button>
        {
          this.state.isLoading === true?
        <img src = 
        'https://backgroundcheckall.com/wp-content/uploads/2017/12/loading-animated-gif-transparent-background-6.gif'
        height = '100px' alt = 'Carregando'/>:null
        }
        {
          this.state.validState === false ?
            <p style ={Style.warning}>E-mail ou senha inválidos</p>
          :
            null
        }
      </form>
    );
  }
}

export default App;
