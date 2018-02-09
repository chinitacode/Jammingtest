import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [
      {
        name: 'Ruin',
        artist: 'Shawn Mendes',
        album: 'Illuminate'
      },
      {
        name: 'Something Just Like This',
        artist: 'The Chainsmokers, Coldplay',
        album: 'Memories Do Not Open'
      },
      {
        name: 'Stitches',
        artist: 'Shawn Mendes',
        album: 'Handwritten(Deluxe)'
      }
    ],
    playlistName: 'Pop',
    playlistTracks: [
      {
      name: 'Stronger',
      artist: 'Britney Spears',
      album: 'Oops!... I Did It Again'
    },
    {
      name: 'Kissing Strangers',
      artist: 'DNCE',
      album: 'Kissing Strangers'
    }
  ]
};
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
  }

  search(term) {
     console.log(term);
     Spotify.getAccessToken();
		 this.setState({searchResults: Spotify.search(term)});
  }

  addTrack(track) {
    if(!this.state.playlistTracks.find(song => song.id === track.id)) {
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track) {
    this.setState({playlistTracks:
      this.state.playlistTracks.filter(song => {song.id !== track.id})});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  //not sure if this is right
  savePlaylist() {

    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist();
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
  });
  }



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults} />
            <Playlist
              playlistName={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
