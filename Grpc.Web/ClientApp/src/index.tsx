import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import * as signalR from "@aspnet/signalr";

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();

//const connection = new signalR.HubConnectionBuilder()
//    .withUrl("/hub")
//    .build();

//connection.start().catch(err => console.log(err));

//connection.on("messageReceived", (message: string) => {
//    console.log(message);
//});
//setTimeout(() => {
//    connection.send("newMessage", "rrrrrr")
//        .then(() => console.log("===="));
//}, 2000);
