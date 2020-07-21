import React, { useEffect, useState } from 'react';
import UserStore from './stores/UserStore';
import {observer} from 'mobx-react'
import { create } from 'mobx-persist';
import NavBar from './components/NavBar'
import InputField from './components/InputField'
import SubmitButton from './components/NavBar'
import Boards from './components/Boards'
import Websocket from 'react-websocket';
import './style/App.css';

var textEncoding = require('text-encoding');  
var TextDecoder = textEncoding.TextDecoder


const App = () => {

  const hydrate = create({
    storage: UserStore,
    jsonify: true,
  });

  //const [state, setState] = useState(UserStore.isLoggedIn);

  useEffect(() => { async function fetchData(){
    try{
      let res = await fetch('isLoggedIn', {
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      let result = await res.json();

      if(result && result.success){
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }else{
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }
    catch(e){
      UserStore.loading=false;
      UserStore.isLoggedIn = false;
    }
  }
  fetchData();
  }, []);

  const doLogOut= async()=>{
    try{
      
        UserStore.loading = false;
        UserStore.isLoggedIn=false;
        UserStore.username = '';
      
    }
    catch(e){
      console.log(e)
    }
  }

  const createApiKeyPlayer = async () =>{

    try{
      let res = await fetch(`${process.env.REACT_APP_URL}register_candidate`, {
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      let result = await res.json();

      console.log(result);
      return result.apikey;
      
    }
    catch(e){
      console.log(e)
    }

  }

  const fetchBoards = async ()=>{

    console.log(UserStore.apiKey)
    console.log('above is api key')
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({"apikey":UserStore.apiKey});
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      redirect: 'follow'
      };

let res = await fetch(`${process.env.REACT_APP_URL}boards`, requestOptions);

  const result = await res.text();
  console.log(result);
  result=JSON.parse(result)
      console.log(result)
      console.log('above is boards')
      if(res.status==200){
        return {result:result,status:200};
      }else{
        return{status:res.status}
      }
  
  }

  const handleData= async (data) =>{
    console.log('websocket')
    console.log(data)
    let result = JSON.parse(data);
    this.setState({count: this.state.count + result.movement});
  }

  const createPlayer = async (name) =>{

    let apiKey = await createApiKeyPlayer();
    console.log(name)
    console.log(apiKey)
    console.log(JSON.stringify({
      name: name,
      apikey: apiKey,
    
  }))


    try{

      let result;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({"name":name,"apikey":apiKey});
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      redirect: 'follow'
      };

let res = await fetch(`${process.env.REACT_APP_URL}player`, requestOptions);

  result = await res.text();
  result=JSON.parse(result)

  const boards = fetchBoards();

      if(res.status && boards.status ==200){
        UserStore.loading = false;
        UserStore.isLoggedIn= true;
        UserStore.username = result.name;
        UserStore.apiKey = result.apikey
      }
    }
    catch(e){
      console.log(e)
    }

  }


  
 // 3 ifs
  if(!UserStore.isLoggedIn){
    
    return <div>
      <NavBar
      username={UserStore.username}></NavBar>
    <InputField passedFunction={createPlayer}></InputField>
    </div>
    //create player

  }else if(UserStore.isLoggedIn && !UserStore.board){
    return <div>
      <NavBar
      username={UserStore.username}></NavBar>
      <Boards></Boards>
      <Websocket url={`http://178.128.206.1507000/?id={${UserStore.apiKey}}`}
              onMessage={handleData.bind(this)}/>
    </div>
    //pick board

  }else if(UserStore.isLoggedIn && UserStore.board){

    return <div>
      <NavBar
      username={UserStore.username}></NavBar>
    </div>
    //play

  }else{
    return <h1>Error</h1>
  }

  
}

App.propTypes = {
  //title: string.isRequired
}

export default observer(App)
