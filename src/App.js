import React, { useEffect, useState } from 'react';
import UserStore from './stores/UserStore';
import {observer} from 'mobx-react'
import { create } from 'mobx-persist';
import NavBar from './components/NavBar'
import InputField from './components/InputField'
import SubmitButton from './components/NavBar'
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

  const createPlayer = async (name) =>{

    console.log('this is working')
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

      console.log(result);
      console.log('if is problem')
      console.log(res.status)
      if(res.status){
        console.log('in if')
        UserStore.loading = false;
        UserStore.isLoggedIn= true;
        UserStore.username = result.username;
        console.log('successs');
      }
    }
    catch(e){
      console.log(12345)
      console.log(e)
    }

  }

  var JsonToArray = function(json)
{
	var str = JSON.stringify(json, null, 0);
	var ret = new Uint8Array(str.length);
	for (var i = 0; i < str.length; i++) {
		ret[i] = str.charCodeAt(i);
	}
	return ret
};
  
 // 3 ifs
  if(!UserStore.isLoggedIn){
    
    return <div>
      <NavBar></NavBar>
    <InputField passedFunction={createPlayer}></InputField>
    </div>
    //create player

  }else if(UserStore.isLoggedIn && !UserStore.board){

    //pick board

  }else if(UserStore.isLoggedIn && UserStore.board){

    //play

  }else{
    return <h1>Error</h1>
  }

  
}

App.propTypes = {
  //title: string.isRequired
}

export default observer(App)
