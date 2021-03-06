import React, { Component } from 'react';
import './App.css';
import './ui-toolkit/css/nm-cx/main.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import CityView from './CityView'
import HomeView from './HomeView'
import AddView from './AddView'
import { connect } from "react-redux";

const NmTab = (props) => {
  return (
    
    <Route exact={props.exact} path={props.to} children={({match}) => {
      return (
        <li className={`tab-title ${match ? 'active' : ''}`} >
          <Link to={props.to}>{props.tabName}</Link>
        </li>
      )}
    } />
  )
}

const ButtonGroup = props => (
  <nav className='NavBar'>
    <ul className="tabs">
      {/* calling NmTab to generate the Route, circumvents NM styling and Anchor tags */}
      {/* <NmTab exact={true} to={"/seattle"} tabName="Seattle WA" />
      <NmTab exact={true} to={"/sanjose"} tabName="San Jose CA" />
      <NmTab exact={true} to={"/burbank"} tabName="Burbank CA" />
      <NmTab exact={true} to={"/dallas"} tabName="Dallas TX" />
      <NmTab exact={true} to={"/washington"} tabName="Washington DC" />
      <NmTab exact={true} to={"/chicago"} tabName="Chicago IL" />
      <NmTab exact={true} to={"/tulsa"} tabName="Tulsa OK" /> */}
      {props.locations.map((location) => <NmTab key={location.id} exact={true} to={location.nameInURL} tabName={location.nameInURL}  /> )}
    </ul>
  </nav>
)

const mapStateToProps = state => {
  return {
      locations: state.locations
  };
};

const ButtonGroupWrapped = connect(mapStateToProps)(ButtonGroup);


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <h3>Dojo Weather Forecast</h3>
        <Route><Link to={"/add"}>Add a Weather Forecast</Link></Route>
          <ButtonGroupWrapped />
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/add" component={AddView} />
            <Route path="/:name" render={ ({match}) => <CityView match={match}/>}/>
        </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
