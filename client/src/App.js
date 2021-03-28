import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import { loadUser } from './actions/UserAction';

import HomePage from './pages/HomePage';
import EditContact from './pages/EditContact';
import MainHeader from './cmps/MainHeader';


const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.user.loggedInUser);

  useEffect(() => {
    const getUser = () => {
      dispatch(loadUser())
    }
    if (!loggedInUser) getUser();
  }, [loggedInUser, history, dispatch])

  return (
    <div className="App">
      <MainHeader loggedInUser={loggedInUser} />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/EditContact" exact component={EditContact} />
          <Route path="/EditContact/:id" component={EditContact} />
        </Switch>
      </main>
    </div>
  );
}
export default App;

