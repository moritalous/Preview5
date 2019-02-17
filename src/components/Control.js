import React from 'react';

import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/lab/Slider';

class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playState: props.playState,
      time: props.time,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      playState: props.playState
    });
  }

  render(){
    let playState = this.state.playState;    
    let paper = ''
    let button = '';
    let slider = '';

    if(!playState) {
    } else {
      const result = this.props.results[this.props.index]
      
      const img = <img src={result.artworkUrl100} alt={result.name} style={{maxWidth:'44px', maxHeight:'44px', padding:'0px'}}></img>
      const text = <div style={{textOverflow: 'ellipsis', overflow: 'hidden', fontSize: 'small'}}>{this.props.index + 1}. {result.trackName} / {result.artistName}</div>
      const table = <table><tbody><tr><td style={{padding: '0px'}}>{img}</td><td style={{padding: '0px',}}>{text}</td></tr></tbody></table>
      
      const value = this.props.time.currentTime ? this.props.time.currentTime : 0
      const max = this.props.time.duration ? this.props.time.duration : 100
      slider = <Slider value={value} max={max} miin={0} disabled style={{width:'100%'}}></Slider>

      paper = <Paper elevation={8} style={{position:'fixed',left:'0px',bottom:'0px',height:'48px', width:'100%', padding:"0px", margin:'0px', zIndex:'990', alignItems:'top'}}>{slider}{table}</Paper>
      
      if(playState === 'play'){  
        button = <Fab style={{position:'fixed',right:'20px', bottom:'20px', padding:"4px", zIndex:'999'}} color="secondary" onClick={() => this.props.pause()}><Icon fontSize="small">pause_arrow</Icon></Fab>;
      } else {
        button = <Fab style={{position:'fixed',right:'20px', bottom:'20px', padding:"4px", zIndex:'999'}} color="secondary" onClick={() => this.props.restart()}><Icon fontSize="small">play_arrow</Icon></Fab>;
      }
    }

    return(
      <div>
        {paper}
        {button}
      </div>
    )
  }
}

export default Control;