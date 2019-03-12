import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import pathShip from './Ship.jpg'
import pathWater from './Water.jpg'
import { stat } from 'fs';

  function Square(props) {
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
    }
  
  class Picture extends React.Component {
      constructor (props){
          super(props);
          this.state = {
              path: this.props.path,
          }
      }
      render(){
          return <img className="img" src={this.state.path}/>;
      }
  }

  class Board extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
        } 
    }

    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
  
      return (
        <div>
          <div>{this.state.value}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
          </div>
          <div className="board-row">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
          </div>
          <div className="board-row">
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
          </div>
          <div className="board-row">
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
            {this.renderSquare(15)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player1Hits: Array(16).fill(null),
            player2Hits: Array(16).fill(null),
            player1: ['X', null, null, null, 
                      'X', null, null, null, 
                      null, null, null, 'X',
                      'X', 'X', null, 'X'
                     ],
            player2: [null, null, 'X', null,
                      null, null, 'X', null,
                      'X', 'X', null, null,
                      null, null, 'X', 'X'
                     ],
            currentPlayer: true,
       };
    }

    /*handleClick(i) {
        let current;
        let currentHits;
        if(this.state.currentPlayer){
            current = this.state.player2;
            currentHits = this.state.player1Hits;
        } else {
            current = this.state.player1;
            currentHits = this.state.player2Hits;
        }

        const winner1 = calculateWinner(this.state.player1Hits, this.state.player2);
        const winner2 = calculateWinner(this.state.player2Hits, this.state.player1);
        
        if(winner1 && !winner2){
            return;
        } else if(!winner1 && winner2) {
            return;
        }
        
        if(!alreadyHit(currentHits, i)){
            currentHits[i] = isHit(current, i) ? 'X' : 'O';
            if(this.state.currentPlayer){
                this.setState({
                    player1Hits: currentHits,
                    currentPlayer: !this.state.currentPlayer,
                });
            } else {
                this.setState({
                    player2Hits: currentHits,
                    currentPlayer: !this.state.currentPlayer,
                })
            }
        }
    }*/
      
    handleClick1(i) {
        if(this.state.currentPlayer || this.state.player1Hits[i]){
            return;
        }

        const winner1 = calculateWinner(this.state.player1Hits, this.state.player2);
        const winner2 = calculateWinner(this.state.player2Hits, this.state.player1);
        
        if(winner1 && !winner2){
            return;
        } else if(winner2 && !winner1) {
            return;
        }

        this.state.player1Hits[i] = isHit(this.state.player2, i) ? 'X' : 'O';
        this.setState({
            player1Hits: this.state.player1Hits,
            currentPlayer: !this.state.currentPlayer,
        })

    }

    handleClick2(i) {
        if(!this.state.currentPlayer || this.state.player2Hits[i]){
            return;
        }

        const winner1 = calculateWinner(this.state.player1Hits, this.state.player2);
        const winner2 = calculateWinner(this.state.player2Hits, this.state.player1);
        
        if(winner1 && !winner2){
            return;
        } else if(winner2 && !winner1) {
            return;
        }

        this.state.player2Hits[i] = isHit(this.state.player1, i) ? 'X' : 'O';
        this.setState({
            player2Hits: this.state.player2Hits,
            currentPlayer: !this.state.currentPlayer,
        })
    }

    render() {
    
        const winner1 = calculateWinner(this.state.player1, this.state.player2Hits);
        const winner2 = calculateWinner(this.state.player2, this.state.player1Hits);

        let status;
        if(winner1 && !winner2){
            status = "Player 1 Won!";
        } else if(!winner1 && winner2) {
            status = "Player 2 Won!";
        } else {
            if(this.state.currentPlayer){
                status = "Player 1 shoots!";
            } else {
                status = "Player 2 shoots!";
            }
        }

      return (
        <div className="game">
          <div>
            <Board
                value="Player 1"
                squares={this.state.player1Hits}
                onClick={(i) => this.handleClick1(i)}
            />
            <Board
                value="Player 2" 
                squares={this.state.player2Hits}
                onClick={(i) => this.handleClick2(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
          </div>
        </div>
      );
    }
  }
  
  function isHit(squares, index){
    if(squares[index] === 'X')
        return true;
    return false;
  }

  function calculateWinner(squares, table){
      let score = 0;
      for(let i = 0; i < 16; i++){
          if(squares[i] === 'X' && table[i] === 'X')
            score += 1;
      }
      if(score === 6)
        return true;
      return false;
  }

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  