import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




class Square extends React.Component {

    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xisNext: true,
            message: null,
            scorex: 0,
            scorey: 0,
        }
    }
    handleClick(i) {
        var squares = this.state.squares;


        // var Won = this.calWinner(squares);
        if (squares[i]) {
            return;
        }
        else {
            squares[i] = this.state.xisNext ? 'X' : 'Y';
            var Won = this.calWinner(squares);
            if (Won) {
                if (Won === 'X') {
                    this.setState({
                        squares: Array(9).fill(null),
                        xisNext: this.state.xisNext,
                        message: 'Player X Won',
                        scorex: this.state.scorex + 1
                    })
                } else if (Won === 'Y') {
                    this.setState({
                        squares: Array(9).fill(null),
                        xisNext: this.state.xisNext,
                        message: 'Player Y Won',
                        scorey: this.state.scorey + 1
                    })
                }

            }
            else if (!Won) {
                this.state.squares.includes(null) ? this.setState({
                    squares: squares,
                    xisNext: !this.state.xisNext,
                    message: ''
                })
                    :
                    this.setState({
                        squares: Array(9).fill(null),
                        xisNext: !this.state.xisNext,
                        message: 'No One Won'
                    })

            }

        }
    }



    calWinner(squares) {

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;



    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={
            () => {
                this.handleClick(i)
            }


        } />;

    }
    render() {
        var status = '';
        if (this.state.message) {
            // console.log('no one won');
            status = this.state.message + ' , ' + (this.state.xisNext ? 'Next player: X' : 'Next player: Y');
            // status = this.state.xisNext?'Next player: X':'Next player: Y';
        } else {
            status = this.state.xisNext ? 'Next player: X' : 'Next player: Y';
        }


        return (

            <div>
            <center>
                <p>
                    Score of X = {this.state.scorex}<br />
             Score of Y = {this.state.scorey}

                </p>

                <div className="status">{status}</div><br/>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
</center>
            </div>

        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                <center>
                    <Board />
                    </center>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
