
import logo from "./logo.svg";


import React from "react";
import "./App.css";
import { render } from 'react-dom';
// import Box from "./Box.js";
import { Paper, TextField,Grid } from "@material-ui/core";
import Comment from './Comment';
import { Component } from "react";
import youtube from "./youtube.js";

 

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      searchKeyword: 'reactjs',
      listOfVideos: [],
      loadingStatus: null 
    };
  }

setSearchValue = (event) => {

this.setState({
  searchKeyword: event.target.value
})
console.log(this.state.searchKeyword)
}
searchVideo = async () => {
    this.setState({
    loadingStatus: "LOADING"
  })

const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.searchKeyword}&type=video&videoDefinition=high&key=AIzaSyCZTfF1BYJtoeXcXXsutj9vPNGndDmhD0Y`);
const myJson = await response.json();
console.log(myJson);
this.setState({
  listOfVideos: myJson.items
})
console.log(this.state.listOfVideos)
  this.setState({
    loadingStatus: "LOADED"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    loadingStatus: 'LOADING'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=15&regionCode=IN&key=AIzaSyCZTfF1BYJtoeXcXXsutj9vPNGndDmhD0Y`);
const myJson = await response.json();
console.log(myJson);
this.setState({
  listOfVideos: myJson.items,
  loadingStatus: "LOADED"
})
console.log(this.state.listOfVideos)
}
componentDidMount() {
  this.showMostPopularVideos()
}


  render() {
    const{selectedVideo,setSelectedVideo,setVideos}=this.state;
    let videos = this.state.listOfVideos.map(eachVideo => (
<iframe src={`https://www.youtube.com/embed/${eachVideo.id.videoId}`}/>
        ))

    return (
    
      <div style={{ justifyContent: "center", alignItems: "center" }} > 
     
      
         <Paper elevation={3} style={{ padding: "25px", alignItems: "center" }}>
     
      <center><input placeholder="upGrad" onChange={this.setSearchValue} />
        <button onClick={this.searchVideo}>Search</button>
        </center>
    </Paper>
        <br/>
        <br/>
        <br/>
        {this.state.loadingStatus == "LOADING" ? (<h1>Loading...</h1>) : (videos) }




           <button  style={{marginLeft: "870px" ,backgroundColor:"tomato",padding:'8px'}}onClick={this.likeButton}>{this.state.likeStatus}</button>
            <h3 style={{ marginLeft:'25px'}}> Comments</h3>
    <input style ={{outline: 0 ,border: '0', borderBottom: '2px solid #484a56',width:'425px', marginLeft:'25px', padding:'4px'}} onChange={this.setName} placeholder= "Your Name" value={this.state.name}/>

    <input  style ={{outline: 0,border: '0',borderBottom: '2px solid #484a56',marginLeft:"45px", width:'425px', padding:'4px'}}onChange={this.setComment} placeholder="Your Comment" value={this.state.comment}/> 
    <br/><br/>
    <button  style={{marginLeft:'785px', height:'20px'}} onClick={this.addComment}> Comment</button>&nbsp;
    <button onClick={this.addComment} style={{height:'20px'}}> Cancel</button>
    
    <br/><br/>




    
    
   
    </div>
    );
    
  }
  
}

 render(<App />, document.getElementById('root'));
  export default App

