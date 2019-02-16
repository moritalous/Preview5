import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import './index.css';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';

class Logic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      playIndex: null,
      playMode: null,
    };

    this.search = this.search.bind(this);
    this.searchByCollectionId = this.searchByCollectionId.bind(this);
    this.searchByArtistId = this.searchByArtistId.bind(this);
    this.searchByKeyword = this.searchByKeyword.bind(this);
    this.play = this.play.bind(this);
    this.playEnd = this.playEnd.bind(this);
    this.playTimeupdate = this.playTimeupdate.bind(this);
    this.playPause = this.playPause.bind(this);
    this.playRestart = this.playRestart.bind(this);
    this.playFinish = this.playFinish.bind(this);

    switch(props.match.path) {
      case '/q/:query':
        this.searchByTerm(props.match.params.query);
        break;
      case '/id/:id':
        this.searchByCollectionId(props.match.params.id);
        break;
      default:
        this.searchByTopsales();
        break;
    }
  }

  componentWillReceiveProps(props) {
    switch(props.match.path) {
      case '/q/:query':
        this.searchByTerm(props.match.params.query);
        break;
      case '/id/:id':
        this.searchByCollectionId(props.match.params.id);
        break;
      default:
        this.searchByTopsales();
        break;
    }
  }

  searchByKeyword(term) {
    this.props.history.push('/q/' + term)
  }

  searchByTerm(term) {
    let keyword = term.replace(/ /g, '+');
    let url = "https://itunes.apple.com/search?country=JP&entity=song&term=" + keyword;
    this.search(url);
  }
  
  searchByCollectionId(collectionId) {
    let url = "https://itunes.apple.com/lookup?country=JP&entity=song&id=" + collectionId
    this.search(url)
  }
  searchByArtistId(artistId) {
    let url = "https://itunes.apple.com/lookup?country=JP&entity=song&id=" + artistId
    this.search(url)
  }
  searchByTopsales() {
    const that = this;
    fetch('https://5i396a71kj.execute-api.ap-northeast-1.amazonaws.com/prod/rss', {
      mode: 'cors',
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      let ids = '';
      json.feed.results.forEach(function (result) {
        ids = ids.concat(result.id, ',');
      });

      let random = Math.random()

      that.search('https://itunes.apple.com/lookup?country=JP&entity=song&id=' + ids + '&random=' + random);
    })
  }
  search(url) {
    this.playFinish();

    const that = this;

    fetch(url, {
      mode: 'cors',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      if(json.results) {
       
        let results = json.results.filter((element, index, array) =>  element.wrapperType === 'track');

        that.setState({
          results: results,
        });

        window.scrollTo(0,0);
      }
      
    })
  }

  play(index) {
    this.setState({
      playIndex: index,
      playState: 'play'
    })

    let audio = document.getElementById('audio');
    let result = this.state.results[index];
    
    if(audio) {
      audio.src = result.previewUrl;
      audio.play();
    }
  }

  playEnd(e) {
    let index = this.state.playIndex;

    if(this.state.results.length > index+1) {
      this.play(index+1);
    }else{
      this.playFinish();
    }
  }

  playPause() {
    this.setState({
      playState: 'pause'
    })

    let audio = document.getElementById('audio');
    if(audio) {
      audio.pause();
    }
  }

  playRestart() {
    this.setState({
      playState: 'play'
    })

    let audio = document.getElementById('audio');
    if(audio) {
      audio.play();
    }
  }

  playFinish() {
    this.setState({
      playIndex: null,
      playState: null,
    })

    let audio = document.getElementById('audio');
    if(audio) {
      audio.pause();
      audio.src = '';
    }
  }

  playTimeupdate(e){

  }

  render() {
    let results = this.state.results;
    let playState = this.state.playState;

    return(
      
      <div>
        <Header searchByKeyword={this.searchByKeyword}/>
        <Control playState={playState} pause={this.playPause} restart={this.playRestart} />
        <div style={{height:'72px'}}></div>
        <List results={results} play={this.play}/>
        <audio id='audio' onEnded={this.playEnd} onTimeUpdate={this.playTimeupdate}></audio>
      </div>
    
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ''
    }

    this.changeKeyword = this.changeKeyword.bind(this);
  }

  changeKeyword(e) {
    this.setState({
      keyword: e.target.value,
    });
  }

  render() {
    return (    
      <AppBar position="fixed" color="primary" >
        <Toolbar>
            <Typography variant="title" color="inherit" style={{marginRight:"16px"}}>
            <Link to='/' style={{textDecoration:'none',color:'inherit'}}>
              Preview5
              </Link>
            </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <div style={{position:"relative", marginLeft:0, backgroundColor: fade('#FFFFFF', 0.15),}}>
          <div style={{position: 'absolute',height: '100%',display: 'flex',alignItems: 'center',justifyContent: 'center',paddingLeft:"8px"}}>
            <SearchIcon />
            </div>
            <InputBase name="keyword" type="search" placeholder="Search…" style={{color: "inherit",paddingLeft:"48px"}} value={this.state.keyword} onChange={this.changeKeyword} onKeyDown={(e) => (e.keyCode === 13)?this.props.searchByKeyword(this.state.keyword):null} />
          </div>
        </Toolbar>
      </AppBar>      
    );
  }
}

class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playState: props.playState
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      playState: props.playState
    });
  }

  render(){
    let playState = this.state.playState;    
    let button = '';
    if(!playState) {
    } else if(playState === 'play'){
      button = <Fab style={{position:'fixed',right:'20px', bottom:'20px', padding:"4px", zIndex:'999'}} color="secondary" onClick={() => this.props.pause()}><Icon fontSize="small">pause_arrow</Icon></Fab>;
      
    } else {
      button = <Fab style={{position:'fixed',right:'20px', bottom:'20px', padding:"4px", zIndex:'999'}} color="secondary" onClick={() => this.props.restart()}><Icon fontSize="small">play_arrow</Icon></Fab>;
    }

    return(
      <div>{button}</div>
    )
  }

}

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: props.results,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      results: props.results,
    });
  }

  render() {
    let children = [];
    
    let results = this.state.results;

    results.forEach((result, index) => {
      children.push(<Row result={result} key={result.trackId} index={index} play={this.props.play}></Row>);
    });

    return ( 
      <div>{children}</div>
    );
  }
}

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

// ========================================

ReactDOM.render(
  <BrowserRouter basename='/Preview5'>
    <div>
      <Switch>
        <Route path='/q/:query' component={Logic}></Route>
        <Route path='/id/:id' component={Logic}></Route>
        <Route path='/' component={Logic}></Route>
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);