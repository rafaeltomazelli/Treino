import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { Style } from '../src/App.style';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import Input from '../src/Input/Input';
import {Route , BrowserRouter} from 'react-router-dom';
import Welcome from '../src/WelcomP';


interface ResponseError {
  name: string;
  original: string;
  message: string;
}

interface LoginData {
  token: string;
  user: UserInfo;
}

interface UserInfo {
  id: number;
  active: boolean;
  email: string;
  activationToken: string;
  createdAt: string;
  updatedAt: string;
  salt: string;
  name: string;
  role: string;
}

interface LoginResponse {
  data: LoginData;
  errors?: ResponseError[];
}
<BrowserRouter></BrowserRouter>
class App extends React.Component<any,any> {
  constructor (props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validEmail:'',
      validSenha:'',
      rememberMe:'',
      localData: [],
      login:'',
    };
  } 

  inputChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  rememberChangedHandler = () => {
    if (this.state.rememberMe === true) {
      this.setState({ rememberMe: false });
    } else {
      this.setState({ rememberMe: true });
    }
  }

  evalTests = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const passwordRegex = /\d/
    
    // regex do primeiro issue /^\S*(?=.*[A-Za-z])\S*(?=.*\d)\S*[A-Za-z\d]\S*$/;

    let testSenha = passwordRegex.test(this.state.password) && this.state.password.length >= 4;
    let testEmail = emailRegex.test(this.state.email);

    this.setState({ validEmail: testEmail, validSenha: testSenha });

    if (testEmail && testSenha) {
      this.doLogin(); 
    }
  }

  loadingHandler = () => {
    if (this.state.isLoading === true) {
      this.setState({isLoading: false});
    } else {
      this.setState({isLoading:false})
    }
  }

  async doLogin() {
    const submission = {
      email: this.state.email,
      password: this.state.password,
      rememberMe: this.state.rememberMe,
    };
    const url = 'https://tq-template-server-sample.herokuapp.com/authenticate';
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(url, submission);
      if (response.data === null) {
        alert('erro');
      } else {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('name', response.data.data.user.name);
        this.setState({login: true});
        
      }
    } catch (e) {
        if (e.response !== undefined && e.response.data !== undefined) {
          alert(e.response.data.errors['0'].message);
        }
      }
      
  }

  render() {
    const isEnabled =
    this.state.email.includes('@') > 0 &&
    this.state.password.length >= 4
  
    return (
        <form style={Style.general} onSubmit={this.evalTests}>
          <Input
            name = 'email'
            type = 'email'
            value = {this.state.email}
            changed = {this.inputChangedHandler}
            style = { this.state.validEmail? Style.box:Style.fill}
          />
        {
          this.state.validEmail === false ?  
          <p style = {Style.warning}>E-mail inválido</p>
           :
           null
        }

        <Input 
          name = 'password' 
          type = 'password' 
          value = {this.state.password} 
          changed = {this.inputChangedHandler}
          style = {this.state.validSenha === true? Style.box:Style.fill}
        />
          {
            this.state.validSenha === false ?
            <p style = {Style.warning}>senha inválida</p>
            :
            null
          }

          <label>
            Lembrar me
              <input 
                type = 'checkbox'
                name = 'rememberMe' 
                onChange = {this.rememberChangedHandler}
               />
            </label>

        <button style = {Style.btn} disabled = {!isEnabled}  >Entrar</button>

        {this.state.isLoading === true?
          <img src = 
          'https://backgroundcheckall.com/wp-content/uploads/2017/12/loading-animated-gif-transparent-background-6.gif'
          height = '100px' 
          alt = 'Carregando'
          />:null
        }
        
        {this.state.login?
           <BrowserRouter>
           <Route path = '/' component = {Welcome} />
          </BrowserRouter>
        :
        null
        }
        
        </form>
    );
  }
}

export default App;
