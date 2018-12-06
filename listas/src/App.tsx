import * as React from 'react';
import axios from 'axios';
import Lista from '../src/Componentes/Listas/List'



class Blog extends React.Component {
    state = {
      errors:null,
      data:[],
      scrolling:false,
      scrollY: 0,
      windowHeight: 0,
      pgNum :0,
      winNum :10,
      pgCurrent:1,
      login:false,
      token:'',
    }

    async doLogin() {
      const myInterceptor = axios.interceptors.request.use(config =>{
        return config});
      axios.interceptors.request.eject(myInterceptor);
      const submission = {
        email:"admin@taqtile.com",
	      password: "1111",
        rememberMe: false
      };
      const url = 'https://tq-template-server-sample.herokuapp.com/authenticate';
      try {
        const response:any = await axios.post(url, submission);
        if (response.data === null) {
          alert('erro');
        } else {
          this.setState({login: true, token:response.data.data.token});
          this.fetchData(this.state.pgNum);
        }
      } catch (e) {
          if (e.response !== undefined && e.response.data !== undefined) {
            alert(e.response.data.errors['0'].message);
          }
        }
        
    }

    componentDidMount () {
      window.addEventListener('scroll', this.handleScroll)
      this.fetchData(this.state.pgNum + 1)
    }
  
    componentWillUnmount () {
      window.removeEventListener('scroll', this.handleScroll)
    }

    backTop() {
      window.scrollTo(0, 0)
    }
  
  
    handleScroll = () => {
      this.setState({ scrollY: window.scrollY , windowHeight: window.innerHeight}, () => {
        if(document.documentElement !== null) {
          if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
            this.setState({pgNum: this.state.pgNum + 1})
            this.fetchData(this.state.pgNum + 1); 
            this.backTop();
          }    
        }
      }) 
    }

    fetchData (pg: number) {
      if (this.state.login == true){
        const urlpiece = ('https://tq-template-server-sample.herokuapp.com/users?pagination={"page": ')
        const url =  (urlpiece + pg +' ,' + ' "window": ' + this.state.winNum +'}')
        axios.get(url,{headers:{Authorization:this.state.token}})
        .then( response => {
            const data = response.data.data;
            const upData = data.map((post:any) => {
              return data
            });
          this.setState({data: upData});
        })
        .catch(error => {
          alert(error)
        });
      }
      else{
        this.doLogin()
        }
    } 

     render () {
      let infos = null;
      let i = -1;
      if (!this.state.errors) {
          infos = this.state.data.map((data:any) => {
            do{i = i + 1;
                return <Lista 
                    title={data[i].name} 
                    author={data[i].role} key={data[i].id} />;
            }while(i < this.state.winNum);
          });
        }
       

        return (
          <div onScroll = {this.handleScroll}>
          <section className="Posts">
          {infos}
          </section>
          </div>
        );
    }
}

export default Blog;