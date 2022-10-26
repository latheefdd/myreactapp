
import MyButton from './MyButton.js';
import "./styles.css";
import Drawing from './Drawing.js';
var React=require('react');
var ReactDOM=require('react-dom');
const arr1=['MSR1','MSR2','MSR3','FEED','WMO1','WMO2','FSO','CG1O',
'CG2O','PDHD','PDSD','ASI-IRD1','ASI-IRD2','ENC1M-MON','ENC1R-M','ENC2M-MON']
const arr2=['ENC2R-MON','MOD1M-MON','MOD1R-MON','MOD2M-MON','MOD2R-MON','OLD-ES-OUT15','ENC1M-IN','ENC1R-IN'
,'ENC2M-IN','ENC2R-IN','ASI-IRD1-IN','X','X','X','ASI-IRD2-IN','1-9"MON']
const arr3=['2-9"MON','3-9"MON','4-9"MON','A/V-MON','17"MON','WMIN1','WMIN2','FSIN',
'CG1IN-HD','CG2IN-HD','HD TO MSR','X','X','X','X','X']
const arr4=['X','X','X','X','X','X','X','WMO TO OLD ES',
'WM-MON','X','X','x','x','x','x','x'];
class Square extends React.Component {

    constructor(props) {
      super(props);
      this.status = {
       value: false,
      };
    }
    render() {
      
      //const [isActive, setIsActive] = useState(false);
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
          <div>{ arr2.map(sw=>(<Square value={sw}/>))}</div>          
          <div>{arr3.map(sw=>(<Square value={sw}/>))}</div>
          <div>{ arr4.map(sw=>(<Square value={sw}/>))}</div> 
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
