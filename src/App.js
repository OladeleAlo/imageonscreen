import React from "react";
import './App.css';
import {useEffect,useState} from "react";
import axios from "axios";


interface UserName {
  first: string;
  last: string;
  title: string;
}

interface UserInfo {
  name: UserName;
}
const fetchRandomData = ()=>{
  return axios.get('https://randomuser.me/api')
    .then(({data}) =>{
      console.log(data);
      return data;

    }) 
    .catch(err => {
      // handle error
      console.error(err);
    });  
}



const getFullUserName = (userInfo : UserInfo)=>{
  const {name :{first,last} }= userInfo;
  return `${first} ${last}`;
}

function App() {
 

  const [counter,setCounter] = useState(0);
  const [randomUserData,setRandomUserData] = useState("");
  const [userInfos,setUserInfos] = useState([]);
  
  useEffect(()=>{
    fetchRandomData().then(randomData=>{
      setRandomUserData(JSON.stringify(randomData,null,5 )|| "No User FOund");
      setUserInfos(randomData.results)
    });
    

  },[])
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Welcome to My ImageSearch
        </h2>
        
        <button onClick={()=>{
          setCounter (counter -1)
          console.log("API")
        }}>Decrease counter</button>
        {counter}
        <button onClick={()=>{
          setCounter (counter +1)
        }}>Increase counter</button>
        {
          userInfos.map((userInfo: UserInfo,idx: number)=>(
            <div key={idx}>
            <p>{getFullUserName(userInfo)}</p>
            {}
            </div>
          ))
        }
        <p>
          {randomUserData}
        </p>


        
      </header>
    </div>
  );
}





export default App;
