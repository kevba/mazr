import React from 'react';
import {connect} from 'react-redux';

import {withStyles} from '@material-ui/core/styles';

import renderNextLevelScreen from './renderNextLevelScreen';

import {setRun} from 'src/actions/run.js';


const styles = () => ({
    canvas: {
        marginTop: '2em',
        display: 'block',
        border: '5px solid #444',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});


class StartView extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.renderOther();
    }

    componentDidUpdate() {
        this.renderOther();
    }

    handleKeyPress(e) {
        switch (e.keyCode) {
        case 32:
            this.props.start();
            break;
        default:
            break;
        }
    }

    render() {
        let {height, width} = this.props.canvas;
        let {classes} = this.props;

        return (
            <div>
                <canvas
                    className={classes.canvas}
                    id="start-view"
                    width={width}
                    height={height}
                    ref={this.canvasRef}
                    onKeyDown={e => this.handleKeyPress(e)} tabIndex="0" />
            </div>
        );
    }

    renderOther() {
        let {scale} = this.props.canvas;
        let canvas = this.canvasRef.current;
        let ctx = canvas.getContext('2d');
        let {level, player} = this.props;
        renderNextLevelScreen(ctx, level, player, this.props.canvas, scale);
    }
}

const mapStateToProps = state => ({
    canvas: state.canvas,
    level: state.level,
    player: state.player,
});

const mapDispatchToProps = dispatch => {
    return {
        start: () => dispatch(setRun(true)),
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(StartView));
