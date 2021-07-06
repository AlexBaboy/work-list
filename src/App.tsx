import React from 'react';
import {WorkList} from './components/Worklist';
import './App.css';
import {Provider} from "react-redux";
import store from "./store";
import {NavBar} from "./components/NavBar";

function App() {
  return (
      <Provider store={store}>
          <NavBar />
            <WorkList />
      </Provider>
  );
}

export default App;
