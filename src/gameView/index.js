import React from 'react';
import {connect} from 'react-redux';

import {withStyles} from '@material-ui/core/styles';

import * as playerActions from 'src/actions/player';
import * as runActions from 'src/actions/run';
import {setTime} from 'src/actions/time';

import Level from 'src/render/level';

import {LEVEL_STARTING, LEVEL_RUNNING} from 'src/logic/runStates';

const styles = () => ({
    canvas: {
        marginTop: '2em',
        display: 'block',
        border: '5px solid #444',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});


class View extends React.Component {
    constructor(props) {
        super(props);
        this.action = null;
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        let canvas = this.canvasRef.current;
        let ctx = canvas.getContext('2d');

        const level = new Level(
            this.props.canvas.height,
            this.props.canvas.width,
            this.props.level,
            this.props.player,
            this.props.canvas.scale
        );

        let mainLoop = time => {
            this.props.setTime(time);
            level.update(this.props.level, this.props.player);
            level.render(ctx);

            requestAnimationFrame(mainLoop);
        };
        requestAnimationFrame(mainLoop);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', e => {
            this.handleKeyPress(e);
        }, false);
    }

    keyPressLevelRunning(e) {
        switch (e.key) {
        case 'ArrowRight':
            this.action = () => (this.props.actions.move('right'));
            break;
        case 'ArrowLeft':
            this.action = () => (this.props.actions.move('left'));
            break;
        case 'ArrowUp':
            this.action = () => (this.props.actions.move('up'));
            break;
        case 'ArrowDown':
            this.action = () => (this.props.actions.move('down'));
            break;
        default:
            break;
        }
    }

    handleKeyPress(e) {
        let {runState} = this.props.runtime;

        switch (runState) {
        case LEVEL_STARTING:
            this.keyPressLevelStarting(e);
            break;
        case LEVEL_RUNNING:
            this.keyPressLevelRunning(e);
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
                    ref={this.canvasRef} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    runtime: state.run,
    canvas: state.canvas,
    level: state.level,
    player: state.player,
});

const mapDispatchToProps = dispatch => {
    return {
        start: () => dispatch(runActions.setRunState(LEVEL_RUNNING)),
        setTime: t => dispatch(setTime(t)),
        actions: {
            move: direction => dispatch(playerActions.move(direction)),
            moveTo: (x, y) => dispatch(playerActions.moveTo(x, y))
        },
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(View));
