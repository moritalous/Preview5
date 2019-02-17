import React from 'react';
import {Link} from 'react-router-dom'

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card';

class Row extends React.Component {

  render() {
    let result = this.props.result;
    let index = this.props.index;

    let iTunesLinstStyle = {
      display:'inline-block',
      overflow:'hidden',
      background:'url(https://linkmaker.itunes.apple.com/assets/shared/badges/ja-jp/itunes-sm.svg) no-repeat',
      width:'45px',
      height:'15px',
      backgroundSize:'contain'
    }
    
    return (
      
        <Card style={{marginBottom: '8px'}}>
          <table>
        <tbody>
          <tr>
            <td>
            <img src={this.props.result.artworkUrl100} alt={this.props.result.name}></img>
            </td>
            <td>
              {index + 1}. {result.trackName}<IconButton style={{padding:"4px"}} onClick={() => this.props.play(index)}><Icon fontSize="small">play_circle_filled</Icon></IconButton>
              <br></br>
              {result.artistName}
              <Link to={'/id/'+this.props.result.artistId} style={{textDecoration:'none'}}>
                <IconButton style={{padding:"4px"}} ><Icon fontSize="small" >search</Icon></IconButton> 
              </Link>
              <br></br>
              {result.collectionName}
              <Link to={'/id/'+this.props.result.collectionId} style={{textDecoration:'none'}}>
                <IconButton style={{padding:"4px"}} ><Icon fontSize="small" >search</Icon></IconButton> 
              </Link>
              <br></br>
              <a id={this.props.result.id} href={this.props.result.trackViewUrl} target="_blank" rel="noopener noreferrer" style={iTunesLinstStyle}> </a>
            </td>
          </tr>
        </tbody>
        </table>
        </Card>
    );
  }
}

export default Row;