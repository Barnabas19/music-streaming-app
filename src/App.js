import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import Music from './Music';

class App extends Component{
  constructor(props){
    super(props);
    this.updateSelectedTrack = this.updateSelectedTrack.bind(this);
    this.updateSearchedTrack = this.updateSearchedTrack.bind(this);
    this.updateSourceProfileName = this.updateSourceProfileName.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.state = {
      response: null,
      sourceProfileName: "",
      selectedTrack: "",
      searchedTrack: "",
      trackOptions: [
        "", "electro", "metal", "sun", "moon"
      ],
      error: null
    }
  }
  updateSelectedTrack(event){
    const updatedSelectedTrack = event.target.value;
    this.setState({selectedTrack: updatedSelectedTrack})
  }
  updateSearchedTrack(event){
    const updatedSearchedTrack = event.target.value;
    this.setState({searchedTrack: updatedSearchedTrack})
  }
  updateSourceProfileName(event){
    const updatedSourceProfileName = event.target.value;
    this.setState({sourceProfileName: updatedSourceProfileName})
  }
  getResponse(event){
    const {
      sourceProfileName,
      selectedTrack,
      searchedTrack
    } = this.state;

    if(selectedTrack){
      const url = `openwhyd.org/hot/${selectedTrack}?format=json`
      axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
      .then((result)=>{this.setState({response: result})})
      .catch((error)=>{this.setState({error})})
      event.preventDefault()
    }
    if(sourceProfileName){
      const url = `openwhyd.org/${sourceProfileName}?format=json`
      axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
      .then((result)=>{this.setState({response: result})})
      .catch((error)=>{this.setState({error})})
      event.preventDefault()
    }
    if(searchedTrack){
      const url = `openwhyd.org/hot/${searchedTrack}?format=json`
      axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
      .then((result)=>{this.setState({response: result})})
      .catch((error)=>{this.setState({error})})
      event.preventDefault()
    }
  }
  render(){
    return (
      <div className="wrapper">
        <div className="intro">
          <p className="name"><span className="span-1">MUSIC BOY</span><span className="span-2"> - MUSIC CURATION</span><span className="span-3"> SERVICE</span></p>
          <p className="about">Enjoy The Best Music Tracks From Users Around The World</p>
          <p className="more-about">Gain access to hot tracks and playlists created by fellow music lovers. 
          Select a track, or search by track name, or by a user's profile name. Enjoy!
          </p>
        </div>
        <form className="form">
          <label htmlFor="select" className="label">Select a track</label>
          <select
          className="select"
          id="select"
          value={this.state.selectedTrack}
          onChange={
            (event)=>{
              this.updateSelectedTrack(event);
              this.setState({searchedTrack: "", sourceProfileName: ""});
              this.getResponse(event);
            }
          }
          onBlur={
            (event)=>{
              this.updateSelectedTrack(event);
              this.setState({searchedTrack: "", sourceProfileName: ""}); 
              this.getResponse(event);
            }
          }>
            {
              this.state.trackOptions.map((trackOption, index)=>{
                return (
                  <option value={trackOption} className="option" key={index}>{trackOption}</option>
                )
              })
            }
          </select>

          <br/><br/>
          <label htmlFor="track-field" className="label">Search track by name</label>
          <input
          className="input"
          id="track-field"
          value={this.state.searchedTrack}
          onChange={(event)=>{this.updateSearchedTrack(event)}}
          onBlur={(event)=>{this.updateSearchedTrack(event)}}></input>
          <button onClick={(event)=>{this.setState({sourceProfileName: "", selectedTrack: ""}); this.getResponse(event)}} className="button">Search</button>

          <br/><br/>
          <label htmlFor="name-field" className="label">Enter a user's name to get their latest tracks</label>
          <input
          className="input"
          id="name-field"
          value={this.state.sourceProfileName}
          onChange={(event)=>{this.updateSourceProfileName(event)}}
          onBlur={(event)=>{this.updateSourceProfileName(event)}}></input>
          <button onClick={(event)=>{this.setState({searchedTrack: "", selectedTrack: ""}); this.getResponse(event)}} className="button">Search</button>
        </form>
        <div>
          {
            (() => {
              if(this.state.error){
                return (
                  <p className="error">Oops! Something broke</p>
                )
              }else{
                return (
                  <div className="sub-wrapper">
                    {
                      this.state.response && 
                      <section className="tracks-wrapper">
                        {
                          <Music data={this.state.response.data}/>
                        }
                      </section>
                    }
                  </div>
                )
              }
            })()
          }
        </div>
      </div>
    )
  }
}

export default App;