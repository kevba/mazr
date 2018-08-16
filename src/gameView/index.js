import React from 'react';
import {connect} from 'react-redux';

import {withStyles} from '@material-ui/core/styles';

import * as playerActions from 'src/actions/player.js';
import {loop} from 'src/loop'

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

    handleKeyPress(e) {
        switch (e.keyCode) {
        case 32:
            this.actions.append(() => this.props.start());
            break;
        default:
            break;
        }

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

    componentWillMount() {
        document.addEventListener("keydown", (e) => {this.handleKeyPress(e)}, false)
    }

    componentDidMount() {
        let canvas = this.canvasRef.current;
        let ctx = canvas.getContext('2d');

        let mainLoop = () => {
            loop(ctx, {
                level: this.props.level,
                player: this.props.player,
                canvas: this.props.canvas,
            })
            if (this.action !== null) {
                this.action()
            }
            this.action = null
            // for (let i = this.actions.length - 1; i >= 0; i--) {
            //     this.actions.pop()();
            // }
            requestAnimationFrame(mainLoop)
        };
        requestAnimationFrame(mainLoop)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", (e) => {this.handleKeyPress(e)}, false)
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
        start: () => dispatch(setRun(true)),
        actions: {
            move: direction => dispatch(playerActions.move(direction)),
            moveTo: (x, y) => dispatch(playerActions.moveTo(x, y))
        },
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(View));
