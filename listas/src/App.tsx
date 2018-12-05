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
        console.log(this.state.windowHeight)
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
      console.log('fui chamado'+ pg + 'vezes');
      const token1 =('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6NTF9LCJpYXQiOjE1NDQwN');
      const token2 =('DY0OTksImV4cCI6MTU0NDA1MDA5OX0.gcDEpKeIU-FYFKWZMUdWJJ7VahnUSEjmOwaoA8kMv-0');
      const token3 = (token1 + token2);
      const urlpiece = ('https://tq-template-server-sample.herokuapp.com/users?pagination={"page": ')
      const url =  (urlpiece + pg +' ,' + ' "window": ' + this.state.winNum +'}')
      axios.get(url,{headers:{Authorization:token3}})
      .then( response => {
        const data = response.data.data;
        console.log(response);
        const upData = data.map((post:any) => {
          return data
          });
          this.setState({data: upData});
      }).catch(error => {
          alert(error)
        });
    } 

     render () {
       console.log(this.state.pgNum)
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