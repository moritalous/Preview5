import React from 'react';

import Grid from '@material-ui/core/Grid'

import Header from './Header'
import Control from './Control'
import List from './List'

class Logic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      playIndex: null,
      playState: null,
      time: {
        currentTime: null,
        duration: null,
      },
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
      that.search('https://itunes.apple.com/lookup?country=JP&entity=song&id=' + ids);
    })
  }
  search(url) {
    this.playFinish();

    const that = this;

    let random = Math.random()
    let fetchUrl = url + '&random=' + random

    fetch(fetchUrl, {
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
      time: {
        currentTime: null,
        duration: null,
      },
    })

    let audio = document.getElementById('audio');
    if(audio) {
      audio.pause();
      audio.src = '';
    }
  }

  playTimeupdate(e){
    if(e.target) {
      const currentTime = e.target.currentTime
      const duration = e.target.duration

      if(currentTime && duration) {
        this.setState({
          time: {
            currentTime: currentTime,
            duration: duration,
          },
        })
      }
    }
  }

  render() {
    let results = this.state.results;
    let playState = this.state.playState;
    let time = this.state.time;

    return(
      
      <div>
        <Header searchByKeyword={this.searchByKeyword}/>
        <Control playState={playState} time={time} pause={this.playPause} restart={this.playRestart} results={results} index={this.state.playIndex} />
        <div style={{height:'64px'}}></div>
        <Grid container justify={'center'}>
          <Grid item xs={12} sm={8}>
            <List results={results} play={this.play}/>
          </Grid>
        </Grid>
      
        <audio id='audio' onEnded={this.playEnd} onTimeUpdate={this.playTimeupdate}></audio>
      </div>
    );
  }
}

export default Logic;