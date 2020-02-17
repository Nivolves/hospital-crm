import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AddPatient from './pages/AddPatient';
import App from './App';
import DocktorsRegister from './components/DocktorsRegister/DocktorsRegister';
import Patient from './pages/Patient';
import Patients from './pages/Patients';

import { StoreProvider } from './store/context';

import './index.scss';
import 'antd/dist/antd.css';
import 'react-quill/dist/quill.snow.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StoreProvider>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path="/admin/add-docktor" exact component={DocktorsRegister} />
          <Route path="/doctor/add-patient" exact component={AddPatient} />
          <Route path="/doctor/patient/:path" component={Patient} />
          <Route path="/doctor/patients" exact component={Patients} />
        </Switch>
      </App>
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
