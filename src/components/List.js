import React from 'react';

import Row from './Row'

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
    children.push(<div key={-1} style={{height:'40px'}}></div>)

    return ( 
      <div>{children}</div>
    );
  }
}

export default List;