import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundy';
import './App.css';

import { setSearchField, requestRobots } from '../actions'

const mapStateToProps = state => {
  return {
     searchField: state.searchRobots.searchField,
     robots: state.requestRobots.robots,
     ipPending: state.requestRobots.isPending,
     error: state.requestRobots.error 
  }
}

const MapsDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}
class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
  }
}

export default connect(mapStateToProps, MapsDispatchToProps)(App);

// ====>>>>>> Code using React Hooks:

// import React, { useState, useEffect } from 'react';
// import CardList from '../components/CardList';
// import SearchBox from '../components/SearchBox';
// import Scroll from '../components/Scroll';
// import './App.css';

// function App () {
//   // constructor() {
//   //   super()
//   //   this.state = {
//   //     robots: [],
//   //     searchfield: ''
//   //   }
//   // }

//   const [robots, setRobots] = useState([]);
//   const [searchfield, setSearchfield] = useState('');

//   // componentDidMount() {
//   //   fetch('https://jsonplaceholder.typicode.com/users')
//   //     .then(response=> response.json())
//   //     .then(users => {this.setState({ robots: users})});
//   // }
//   useEffect(() => {
//       fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response=> response.json())
//       .then(users => {setRobots(users)});
//   },[])

//   const onSearchChange = (event) => {
//     setSearchfield(event.target.value )
//   }

//   const filteredRobots = robots.filter(robot =>{
//     return robot.name.toLowerCase().includes(searchfield.toLowerCase());
//   })
//   return !robots.length ?
//     <h1>Loading</h1> :
//     (
//       <div className='tc'>
//         <h1 className='f1'>RoboFriends</h1>
//         <SearchBox searchChange={onSearchChange}/>
//         <Scroll>
//           <CardList robots={filteredRobots} />
//         </Scroll>
//       </div>
//     );
// }


// export default App;