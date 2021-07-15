import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./store";
import {NavBar} from "./components/NavBar";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import {Login} from "./pages/Login";
import {AddTask} from "./pages/AddTask";
import {ErrorPage} from "./pages/ErrorPage";
import {WorkList} from "./pages/WorkList";
import {EditTask} from "./pages/EditTask";

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <NavBar />
              <Switch>
                  <Route path="/"  component={WorkList} exact />
                  <Route path="/login" component={Login} />
                  <Route path="/addTask" component={AddTask} />
                  <Route path="/edit/:id" component={EditTask} />
                  <Route path="*"  component={ErrorPage} />
              </Switch>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
