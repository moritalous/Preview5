(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{80:function(e,t,a){e.exports=a(81)},81:function(e,t,a){"use strict";a.r(t);var n=a(21),r=a(22),l=a(25),s=a(23),i=a(26),c=a(4),o=a(0),p=a.n(o),u=a(29),d=a.n(u),h=a(46),y=a(205),m=a(206),b=a(47),f=(a(86),a(24)),v=a.n(f),E=a(39),k=a.n(E),j=a(45),x=a.n(j),g=a(78),O=a.n(g),w=a(36),S=a.n(w),B=a(72),I=a.n(B),C=a(74),T=a.n(C),P=a(75),K=a.n(P),z=a(77),F=a.n(z),q=a(35),R=a(76),J=a.n(R),U=function(e){function t(e){var a;switch(Object(n.a)(this,t),(a=Object(l.a)(this,Object(s.a)(t).call(this,e))).state={results:[],playIndex:null,playMode:null},a.search=a.search.bind(Object(c.a)(Object(c.a)(a))),a.searchByCollectionId=a.searchByCollectionId.bind(Object(c.a)(Object(c.a)(a))),a.searchByArtistId=a.searchByArtistId.bind(Object(c.a)(Object(c.a)(a))),a.searchByKeyword=a.searchByKeyword.bind(Object(c.a)(Object(c.a)(a))),a.play=a.play.bind(Object(c.a)(Object(c.a)(a))),a.playEnd=a.playEnd.bind(Object(c.a)(Object(c.a)(a))),a.playTimeupdate=a.playTimeupdate.bind(Object(c.a)(Object(c.a)(a))),a.playPause=a.playPause.bind(Object(c.a)(Object(c.a)(a))),a.playRestart=a.playRestart.bind(Object(c.a)(Object(c.a)(a))),a.playFinish=a.playFinish.bind(Object(c.a)(Object(c.a)(a))),e.match.path){case"/q/:query":a.searchByTerm(e.match.params.query);break;case"/id/:id":a.searchByCollectionId(e.match.params.id);break;default:a.searchByTopsales()}return a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentWillReceiveProps",value:function(e){switch(e.match.path){case"/q/:query":this.searchByTerm(e.match.params.query);break;case"/id/:id":this.searchByCollectionId(e.match.params.id);break;default:this.searchByTopsales()}}},{key:"searchByKeyword",value:function(e){this.props.history.push("/q/"+e)}},{key:"searchByTerm",value:function(e){var t="https://itunes.apple.com/search?country=JP&entity=song&term="+e.replace(/ /g,"+");this.search(t)}},{key:"searchByCollectionId",value:function(e){var t="https://itunes.apple.com/lookup?country=JP&entity=song&id="+e;this.search(t)}},{key:"searchByArtistId",value:function(e){var t="https://itunes.apple.com/lookup?country=JP&entity=song&id="+e;this.search(t)}},{key:"searchByTopsales",value:function(){var e=this;fetch("https://5i396a71kj.execute-api.ap-northeast-1.amazonaws.com/prod/rss",{mode:"cors"}).then(function(e){return e.json()}).then(function(t){var a="";t.feed.results.forEach(function(e){a=a.concat(e.id,",")}),e.search("https://itunes.apple.com/lookup?country=JP&entity=song&id="+a)})}},{key:"search",value:function(e){this.playFinish();var t=this,a=Math.random();fetch(e+"&random="+a,{mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8"}}).then(function(e){return e.json()}).then(function(e){if(e.results){var a=e.results.filter(function(e,t,a){return"track"===e.wrapperType});t.setState({results:a}),window.scrollTo(0,0)}})}},{key:"play",value:function(e){this.setState({playIndex:e,playState:"play"});var t=document.getElementById("audio"),a=this.state.results[e];t&&(t.src=a.previewUrl,t.play())}},{key:"playEnd",value:function(e){var t=this.state.playIndex;this.state.results.length>t+1?this.play(t+1):this.playFinish()}},{key:"playPause",value:function(){this.setState({playState:"pause"});var e=document.getElementById("audio");e&&e.pause()}},{key:"playRestart",value:function(){this.setState({playState:"play"});var e=document.getElementById("audio");e&&e.play()}},{key:"playFinish",value:function(){this.setState({playIndex:null,playState:null});var e=document.getElementById("audio");e&&(e.pause(),e.src="")}},{key:"playTimeupdate",value:function(e){}},{key:"render",value:function(){var e=this.state.results,t=this.state.playState;return p.a.createElement("div",null,p.a.createElement(N,{searchByKeyword:this.searchByKeyword}),p.a.createElement(_,{playState:t,pause:this.playPause,restart:this.playRestart,results:e,index:this.state.playIndex}),p.a.createElement("div",{style:{height:"72px"}}),p.a.createElement(D,{results:e,play:this.play}),p.a.createElement("audio",{id:"audio",onEnded:this.playEnd,onTimeUpdate:this.playTimeupdate}))}}]),t}(p.a.Component),N=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(s.a)(t).call(this,e))).state={keyword:""},a.changeKeyword=a.changeKeyword.bind(Object(c.a)(Object(c.a)(a))),a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"changeKeyword",value:function(e){this.setState({keyword:e.target.value})}},{key:"render",value:function(){var e=this;return p.a.createElement(I.a,{position:"fixed",color:"primary"},p.a.createElement(T.a,null,p.a.createElement(K.a,{variant:"title",color:"inherit",style:{marginRight:"16px"}},p.a.createElement(h.a,{to:"/",style:{textDecoration:"none",color:"inherit"}},"Preview5")),p.a.createElement("div",{style:{flexGrow:1}}),p.a.createElement("div",{style:{position:"relative",marginLeft:0,backgroundColor:Object(q.fade)("#FFFFFF",.15)}},p.a.createElement("div",{style:{position:"absolute",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",paddingLeft:"8px"}},p.a.createElement(J.a,null)),p.a.createElement(F.a,{name:"keyword",type:"search",placeholder:"Search\u2026",style:{color:"inherit",paddingLeft:"48px"},value:this.state.keyword,onChange:this.changeKeyword,onKeyDown:function(t){return 13===t.keyCode?e.props.searchByKeyword(e.state.keyword):null},onKeyUp:function(e){return 13===e.keyCode?document.activeElement.blur():null}}))))}}]),t}(p.a.Component),_=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(s.a)(t).call(this,e))).state={playState:e.playState},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({playState:e.playState})}},{key:"render",value:function(){var e=this,t=this.state.playState,a="",n="";if(t){var r=this.props.results[this.props.index],l=p.a.createElement("img",{src:r.artworkUrl100,alt:r.name,style:{maxWidth:"44px",maxHeight:"44px",padding:"0px"}}),s=p.a.createElement("div",{style:{textOverflow:"ellipsis",overflow:"hidden",fontSize:"small"}},this.props.index+1,". ",r.trackName," / ",r.artistName),i=p.a.createElement("table",null,p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",{style:{padding:"0px"}},l),p.a.createElement("td",{style:{padding:"0px"}},s))));a=p.a.createElement(S.a,{elevation:8,style:{position:"fixed",left:"0px",bottom:"0px",height:"48px",width:"100%",padding:"0px",margin:"0px",zIndex:"990",alignItems:"top"}},i),n="play"===t?p.a.createElement(x.a,{style:{position:"fixed",right:"20px",bottom:"20px",padding:"4px",zIndex:"999"},color:"secondary",onClick:function(){return e.props.pause()}},p.a.createElement(v.a,{fontSize:"small"},"pause_arrow")):p.a.createElement(x.a,{style:{position:"fixed",right:"20px",bottom:"20px",padding:"4px",zIndex:"999"},color:"secondary",onClick:function(){return e.props.restart()}},p.a.createElement(v.a,{fontSize:"small"},"play_arrow"))}else;return p.a.createElement("div",null,a,n)}}]),t}(p.a.Component),D=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(s.a)(t).call(this,e))).state={results:e.results},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({results:e.results})}},{key:"render",value:function(){var e=this,t=[];return this.state.results.forEach(function(a,n){t.push(p.a.createElement(W,{result:a,key:a.trackId,index:n,play:e.props.play}))}),t.push(p.a.createElement("div",{key:-1,style:{height:"40px"}})),p.a.createElement("div",null,t)}}]),t}(p.a.Component),W=function(e){function t(){return Object(n.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props.result,a=this.props.index;return p.a.createElement(O.a,{style:{marginBottom:"8px"}},p.a.createElement("table",null,p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("img",{src:this.props.result.artworkUrl100,alt:this.props.result.name})),p.a.createElement("td",null,a+1,". ",t.trackName,p.a.createElement(k.a,{style:{padding:"4px"},onClick:function(){return e.props.play(a)}},p.a.createElement(v.a,{fontSize:"small"},"play_circle_filled")),p.a.createElement("br",null),t.artistName,p.a.createElement(h.a,{to:"/id/"+this.props.result.artistId,style:{textDecoration:"none"}},p.a.createElement(k.a,{style:{padding:"4px"}},p.a.createElement(v.a,{fontSize:"small"},"search"))),p.a.createElement("br",null),t.collectionName,p.a.createElement(h.a,{to:"/id/"+this.props.result.collectionId,style:{textDecoration:"none"}},p.a.createElement(k.a,{style:{padding:"4px"}},p.a.createElement(v.a,{fontSize:"small"},"search"))),p.a.createElement("br",null),p.a.createElement("a",{id:this.props.result.id,href:this.props.result.trackViewUrl,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-block",overflow:"hidden",background:"url(https://linkmaker.itunes.apple.com/assets/shared/badges/ja-jp/itunes-sm.svg) no-repeat",width:"45px",height:"15px",backgroundSize:"contain"}}," "))))))}}]),t}(p.a.Component);d.a.render(p.a.createElement(y.a,{basename:"/Preview5"},p.a.createElement("div",null,p.a.createElement(m.a,null,p.a.createElement(b.a,{path:"/q/:query",component:U}),p.a.createElement(b.a,{path:"/id/:id",component:U}),p.a.createElement(b.a,{path:"/",component:U})))),document.getElementById("root"))},86:function(e,t,a){}},[[80,2,1]]]);
//# sourceMappingURL=main.d0c3b6ce.chunk.js.map