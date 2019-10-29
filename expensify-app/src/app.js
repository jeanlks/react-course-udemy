import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
    <div>
        THis is my dashboard
    </div>
);

const AddExpensePage = () => (
    <div>
       Add expense Page
    </div>
);

const NotFoundPage = () => (
    <div>
       404!
    </div>
);



const routes = (
    <BrowserRouter > 
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true}/>
            <Route path="/create" component={AddExpensePage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById("app"));