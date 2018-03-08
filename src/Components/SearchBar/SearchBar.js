import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {term: ''};

    this.search = this.search.bind(this);
    //this.enter = this. enter.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(event) {
     event.preventDefault();
    this.props.onSearch(this.state.term);
  }

  // enter(e) {
  //   if(e.key == 'Enter') {
  //   this.search();
  //   }
  // }

  handleTermChange(e) {
    this.setState({term: e.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
    <form onSubmit={this.search.bind(this)}>
      <div>
        <input onChange={this.handleTermChange}
        placeholder="Enter a song album or musician"/>
      </div>
      <div>
        <button type="button" value="Send"
        onClick={this.search.bind(this)} > Search </button>
      </div>
    </form>
      </div>
    );
  }
}

export default SearchBar;
