
import MyButton from './MyButton.js';
import "./styles.css";
import Drawing from './Drawing.js';
var React=require('react');
var ReactDOM=require('react-dom');
const arr1=['UPLINK','DOWN LINK','MONITORING','TOOLS'];
class Square extends React.Component {
    constructor(props) {
      super(props);
      this.status = {
       value: false,
      };
    }
    render() {
      return (
            <MyButton className="square" >
          {this.props.value}
        </MyButton>
      );
    }
  }
 
  class Board extends React.Component {
    render() {
      return (
        <div>
          <div>{arr1.map(sw=>(<Square value={sw}/>))}</div>
          <Drawing/>
        </div>
      );
    }
  }
 
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
const root=ReactDOM.createRoot(document.getElementById('app'));
root.render(<Game/>);
