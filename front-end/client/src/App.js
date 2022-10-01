import logo from './logo.svg';
import './App.css';
import {Component} from 'react'
class App extends Component {
  constructor(props){
    super(props);
    this.state = { apiResponse: ''}
  }
  callApi(){
    fetch('http://localhost:9000/testApi')
    .then((res) => res.text())
    .then(res => this.setState({ apiResponse: res}))
    .catch(err => err)
  }
  componentDidMount(){
    this.callApi()
  }
  render() {
    return (
      <div className='App'>
          <p className='App-intro'>{this.state.apiResponse} test</p>
      </div>
    )
  }
}
export default App;