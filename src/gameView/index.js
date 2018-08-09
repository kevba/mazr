import React from 'react';
import {connect} from 'react-redux';

import StartView from './startView';
import BoardView from './boardView';

class View extends React.Component {
    render() {
        if (!this.props.runtime.run) {
            return <StartView />;
        }
        return <BoardView />;
    }
}

const mapStateToProps = state => ({
    runtime: state.run,
});

export default (connect(mapStateToProps)(View));
