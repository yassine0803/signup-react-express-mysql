import './App.css';
import Signup from './components/signup/Signup';
import Profile from './components/profile/Profile';
import {useState} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/profile/:id" exact component={() => user ? <Profile /> :<Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
