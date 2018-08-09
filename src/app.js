import React from 'react';

import {HashRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

// import Paper from 'material-ui/Paper';
import {MuiThemeProvider} from '@material-ui/core/styles';

import Header from 'src/header';

import GameView from 'src/gameView';

import baseTheme from 'src/themes/baseTheme';
import reducer from 'src/reducers';

const store = createStore(
    reducer,
    {},
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={baseTheme}>
                    <HashRouter>
                        <div>
                            <Header />
                            <div>
                                <GameView />
                            </div>
                        </div>
                    </HashRouter>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
