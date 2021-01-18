import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

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

    if(sourceProfileName){
      const url = `openwhyd.org/${sourceProfileName}?format=json`
      axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
      .then((result)=>{console.log(result); this.setState({response: result})})
      .catch((error)=>{this.setState({error})})
    }
    if(selectedTrack){
      const url = `openwhyd.org/hot/${selectedTrack}?format=json`
      axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
      .then((result)=>{console.log(result); this.setState({response: result})})
      .catch((error)=>{this.setState({error})})
    }
    if(searchedTrack){
      const url = `openwhyd.org/hot/${searchedTrack}?format=json`
      axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
      .then((result)=>{console.log(result); this.setState({response: result})})
      .catch((error)=>{this.setState({error})})
    }
    event.preventDefault()
  }
  render(){
    return (
      <div className="wrapper">
        <div></div>
        <form>
          <label htmlFor="select"></label>
          <select
          id="select"
          value={this.state.selectedTrack}
          onChange={
            (event)=>{
              this.updateSelectedTrack(event);
              this.getResponse(event);
            }
          }
          onBlur={
            (event)=>{
              this.updateSelectedTrack(event);
              this.getResponse(event);
            }
          }>
            {
              this.state.trackOptions.map((trackOption)=>{
                return (
                  <option value={trackOption}>{trackOption}</option>
                )
              })
            }
          </select>

          <br/><br/>
          <label htmlFor="track-field"></label>
          <input
          id="track-field"
          value={this.state.searchedTrack}
          onChange={(event)=>{this.updateSearchedTrack(event)}}
          onBlur={(event)=>{this.updateSearchedTrack(event)}}></input>
          <button onClick={(event)=>{this.getResponse(event)}}></button>

          <br/><br/>
          <label htmlFor="name-field"></label>
          <input
          id="name-field"
          value={this.state.sourceProfileName}
          onChange={(event)=>{this.updateSourceProfileName(event)}}
          onBlur={(event)=>{this.updateSourceProfileName(event)}}></input>
          <button onClick={(event)=>{this.getResponse(event)}}>Search</button>
        </form>
        <div>
          {
            (() => {
              if(this.state.error){
                return (
                  <p>Oops! Something broke</p>
                )
              }else{
                return (
                  <div>
                    {
                      this.state.response && 
                      <section className="tracks">
                        {
                          this.state.response.data.map((track)=>{
                            return (
                              <section className="track">
                                <img src={track.img} alt=""></img>
                              </section>
                            )
                          })
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