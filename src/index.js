import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
    this.searchByTerm = this.searchByTerm.bind(this);
    this.play = this.play.bind(this);
    this.playEnd = this.playEnd.bind(this);
    this.playTimeupdate = this.playTimeupdate.bind(this);
    this.playPause = this.playPause.bind(this);
    this.playRestart = this.playRestart.bind(this);
    this.playFinish = this.playFinish.bind(this);

    this.searchByTopsales();
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
    console.info(result.trackName);

    audio.src = result.previewUrl;
    audio.play();
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
    audio.pause();
  }

  playRestart() {
    this.setState({
      playState: 'play'
    })

    let audio = document.getElementById('audio');
    audio.play();
  }

  playFinish() {
    console.info('Play Finish')

    this.setState({
      playIndex: null,
      playState: null,
    })

    let audio = document.getElementById('audio');
    audio.pause();
    audio.src = '';
  }

  playTimeupdate(e){

  }

  render() {
    console.info(this.state)
    let results = this.state.results;
    let playState = this.state.playState;

    return(
      <div>
        <Header searchByKeyword={this.searchByTerm}/>
        <Control playState={playState} pause={this.playPause} restart={this.playRestart} />
        <List results={results} searchByArtist={this.searchByArtistId} searchByCollection={this.searchByCollectionId} play={this.play}/>
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
    <div>
      <input type="text" name="keyword" value={this.state.keyword} onChange={this.changeKeyword}/>
      <button onClick={() => this.props.searchByKeyword(this.state.keyword)} >検索</button>
    </div>
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
    console.log('componentWillReceiveProps')
    console.log(props.playState)
    this.setState({
      playState: props.playState
    });
  }

  render(){
    let playState = this.state.playState;    
    let button = '';
    if(!playState) {
    } else if(playState === 'play'){
      button = <button onClick={() => this.props.pause()}>停止する</button>;
    } else {
      button = <button onClick={() => this.props.restart()}>再生する</button>;
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
    // console.info(props);
    this.setState({
      results: props.results,
    });
  }

  render() {
    let children = [];
    
    let results = this.state.results;

    results.forEach((result, index) => {
      children.push(<Card result={result} key={result.trackId} index={index} searchByArtist={this.props.searchByArtist} searchByCollection={this.props.searchByCollection} play={this.props.play}></Card>);
      console.info(result);
    });

    return ( 
      <div>{children}</div>
    );
  }
}

class Card extends React.Component {

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
      <div>
        -----<br></br>
        {index + 1}. {result.trackName} / {result.artistName}
        <br></br>
        <img src={this.props.result.artworkUrl100} alt={this.props.result.name}></img>
        <br></br>
        <button onClick={() => this.props.searchByArtist(this.props.result.artistId)}>By Artist</button>
        <br></br>
        <button onClick={() => this.props.searchByCollection(this.props.result.collectionId)}>By Collection</button>
        <br></br>
        <button onClick={() => this.props.play(index)}>Play</button>
        <br></br>
        <a id={this.props.result.id} href={this.props.result.trackViewUrl} target="_blank" rel="noopener noreferrer" style={iTunesLinstStyle}> </a>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Logic/> ,
  document.getElementById('root')
);