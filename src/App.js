import './App.scss';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from 'pages/home/Home';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import SignUp from 'pages/login/SignUp';
import Login from 'pages/login/Login';
import Settings from 'pages/setting/Settings';
import ReAuth from 'pages/login/ReAuth';

function App() {
  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({children}) => {
    // console.log(currentUser);
    return currentUser ? children : <Navigate to='login'/>;
  };

  const NoRegistered = ({children}) => {
    return !currentUser ? children : <Navigate to='/' />;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/'
            element={
              <RequireAuth>
                <Home/>
              </RequireAuth>
            } />
          <Route exact
            path='login'
            element={
              <NoRegistered>
                <Login/>
              </NoRegistered>
              }/>
          <Route exact
            path='signup'
            element={
              <NoRegistered>
                <SignUp/>
              </NoRegistered>
              }/>
          <Route exact
            path='setting'
            element={
              <RequireAuth>
                <Settings/>
              </RequireAuth>
              }/>
          <Route exact
            path='auth'
            element={
              <RequireAuth>
                <ReAuth/>
              </RequireAuth>
              }/>
          <Route
            path="*"
            element={
              currentUser? <Navigate to='/' />:<Navigate to='login'/>
              } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
