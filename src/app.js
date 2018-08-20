import React from 'react';

import {HashRouter} from 'react-router-dom';

import {Provider} from 'react-redux';

// import Paper from 'material-ui/Paper';
import {MuiThemeProvider} from '@material-ui/core/styles';

import {store} from 'src/store';

import Header from 'src/header';

import GameView from 'src/gameView';

import baseTheme from 'src/themes/baseTheme';


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
