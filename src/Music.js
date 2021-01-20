import React, {Component} from 'react'

class Music extends Component{
    render(){
        const {data} = this.props;
        if(Array.isArray(data)){
            return(
                <div className="tracks">
                    {
                        data.map((track, index)=>{
                            return (
                                <section className="track" key={index}>
                                   <img src={track.img} alt=""></img>
                                </section>
                            )
                        })
                    }
                </div>
            )
        }
        if(!(Array.isArray(data))){
            return(
                <div className="tracks">
                    {
                        data.tracks.map((track, index)=>{
                            return (
                                <section className="track" key={index}>
                                   <img src={track.img} alt=""></img>
                                </section>
                            )
                        })
                    }
                </div>
            )
        }
    }
}

export default Music;