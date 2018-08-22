//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import chars from "./chars.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    chars,
    clickedChars: [],
    score: 0
  };

//when you click on a card ... the character is taken out of the array
  imageClick = event => {
    const currentChars = event.target.alt;
    const CharsAlreadyClicked =
      this.state.clickedChars.indexOf(currentChars) > -1;

//if you click on a character that has already been selected, the game is reset and cards reordered
    if (CharsAlreadyClicked) {
      this.setState({
        chars: this.state.chars.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedChars: [],
        score: 0
      });
        alert("Those are not the android you were looking for!");

//if you click on an available character, your score is increased and cards reordered
    } else {
      this.setState(
        {
          chars: this.state.chars.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedChars: this.state.clickedChars.concat(
            currentChars
          ),
          score: this.state.score + 1
        },
//if you get all 12 fish corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              chars: this.state.chars.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedChars: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.chars.map(chars => (
            <FriendCard
              imageClick={this.imageClick}
              id={chars.id}
              key={chars.id}
              image={chars.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;