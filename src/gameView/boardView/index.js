import React from 'react';
import {connect} from 'react-redux';

import {withStyles} from '@material-ui/core/styles';

import renderPlayer from './renderPlayer';
import renderLevel from './renderLevel';

import * as playerActions from 'src/actions/player.js';


const styles = () => ({
    canvas: {
        marginTop: '2em',
        display: 'block',
        border: '5px solid #444',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});


class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            allowControls: true,
        };
    }

    componentDidMount() {
        this.switchLevel();
        this.renderOther();
    }

    componentDidUpdate() {
        this.renderOther();
    }

    switchLevel() {
        // Move the player to the start
        let {entrance} = this.props.level;
        this.props.actions.moveTo(entrance.position.x, entrance.position.y);
    }

    handleKeyPress(e) {
        if (!this.state.allowControls) {
            return;
        }

        switch (e.key) {
        case 'ArrowRight':
            this.props.actions.move('right');
            break;
        case 'ArrowLeft':
            this.props.actions.move('left');
            break;
        case 'ArrowUp':
            this.props.actions.move('up');
            break;
        case 'ArrowDown':
            this.props.actions.move('down');
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
                    id="game-field"
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
        let {player, level} = this.props;

        renderLevel(ctx, level, player, this.props.canvas, scale);
        renderPlayer(ctx, player, scale);
    }
}

const mapStateToProps = state => ({
    canvas: state.canvas,
    player: state.player,
    level: state.level,
});

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            move: direction => dispatch(playerActions.move(direction)),
            moveTo: (x, y) => dispatch(playerActions.moveTo(x, y))
        },
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GameView));
