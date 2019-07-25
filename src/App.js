import React, {Component} from 'react';
import './App.css';
import pictures from "./pictures.json";
import PicCard from "./components/PictureCard";

let displayPictures = pictures;
console.log("in App.js displayPictures is ", displayPictures)

class App extends Component {

  state = {
    clicked : [],
    highscore : 0,
    message : ''
  };

  cardClicked = id => {
    if (this.state.clicked.includes(id)) {
      let highScore = this.state.highscore
      if (this.state.clicked.length > highScore) {
        highScore = this.state.clicked.length
      }
      this.setState({ 
        clicked : [], 
        highscore : highScore,
        message : "- Game Over"
      });
      // alert('game over')
    }
    else {
      let clickedArray = this.state.clicked;
      clickedArray.push(id);

      // Suffle the cards for the next click.
      let pictureArray = displayPictures;
      displayPictures = []
      while (pictureArray.length > 0) {
        let i = Math.floor(Math.random() * pictureArray.length);
        displayPictures.push(pictureArray[i]);
        pictureArray.splice(i,1)
      }
      
      this.setState({ clicked : clickedArray, message : "" });
    }
  }

  render() {
    return (
      <div id="container">
        <div id="topdiv">
          <h2>Clicky Game! Click on an image to earn points, but don't click on any more than once!</h2>
          
        </div>
        <div id="scorediv">
          <h2>
            Score: {this.state.clicked.length} -
            High Score: {this.state.highscore}  
            &nbsp; {this.state.message}
          </h2>
        </div>

        {displayPictures.map(picture => (
          <PicCard
            key={picture.id}
            id={picture.id}
            name={picture.name}
            image={picture.image}
            cardClick={this.cardClicked}
            show={true}
          />
        ))}
      </div>
    );
  }
}

export default App;
