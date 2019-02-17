import React from 'react';
import {Link} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';

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
            <InputBase name="keyword" type="search" placeholder="Search..." style={{color: "inherit",paddingLeft:"48px"}} value={this.state.keyword} onChange={this.changeKeyword} onKeyDown={(e) => (e.keyCode === 13)?this.props.searchByKeyword(this.state.keyword):null} onKeyUp={(e) => (e.keyCode === 13)?document.activeElement.blur():null} />
          </div>
        </Toolbar>
      </AppBar>      
    );
  }
}

export default Header;