import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import Consumer from './consumer';

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

const AppRouter = (props) => (
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <a href='' onClick={e => {
                            e.preventDefault();
                            props.push('/');
                        }}>Home</a>
                    </li>
                    <li>
                        <a href='' onClick={e => {
                            e.preventDefault();
                            props.push('/about');
                        }}>About</a>
                    </li>
                    <li>
                        <a href='' onClick={e => {
                            e.preventDefault();
                            props.push('/users');
                        }}>Users</a>
                    </li>
                </ul>
            </nav>

            <Route path="/" exact component={Consumer} />
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
        </div>
    </Router>
);

export default connect(null, { push })(AppRouter);