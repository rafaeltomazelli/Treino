import * as React from 'react';
// import axios, { AxiosPromise } from 'axios';
import axios from 'axios';
import Lista from '../src/Componentes/Listas/List'
// import { throttle } from 'throttle-debounce';
// import {Route , BrowserRouter} from 'react-router-dom';
// import Welcome from '../src/WelcomP';
// interface postData{
//   userID: number;
//   id: number;
//   title: string;
//   body: string
// }



class Blog extends React.Component {
    state = {
      errors:null,
      data:[],
      scrolling:false,
      scrollY: 0,
      windowHeight: 0,
      // maxPosts :4,
      // maxPages :30,
      // currentPage:1,
    }

    componentDidMount () {
      window.addEventListener('scroll', this.handleScroll)
      this.fetchData()
    }
  
    componentWillUnmount () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  
  
    handleScroll = () => {
      
      this.setState({ scrollY: window.scrollY , windowHeight: window.innerHeight}, () => {
        if(document.documentElement !== null) {
          if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
            console.log('srcoll');
            this.fetchData();
          }    
        }
      }) 
    }

    fetchData () {
      const url = ('https://jsonplaceholder.typicode.com/posts')
      axios.get(url)
      .then( response => {
        const data = response.data;
        const upData = data.map((post:any) => {
          return data
          });
          this.setState({data: upData}); 
      }).catch(error => {
          this.setState({error: true});
        });
    } 



     render () {
      let infos = null;
      if (!this.state.errors) {
          infos = this.state.data.map((data:any) => {
                return <Lista 
                    title={data.user} 
                    author={data.userrole} key={data.user} />;
    
            });
        }
       

        return (
          <div onScroll = {this.handleScroll}>
          <section className="Posts">
          Hello world
          {infos}
          </section>
          </div>
        );
    }
}

export default Blog;