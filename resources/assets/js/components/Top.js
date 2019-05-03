import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import cyan from '@material-ui/core/colors/cyan';
import Button from '@material-ui/core/Button';

const cyan100 = cyan["600"];

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    bar: {
        height: '10%',
        width: '100%',
        backgroundColor: cyan100,
    },
    button: {
        fontSize: '20px',
        margin: 'auto',
    },
    mainContentBox: {
        display: 'flex',
        height: '90%',
        width: '100%',
    },
    mainContent: {
        height: '100%',
        width: '100%',
    }
};

class Top extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.bar}>
                    <Toolbar>
                        <Typography variant="h3" color="inherit" className={classes.grow}>
                            訪問記録管理アプリ
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.mainContentBox}>

                    <Button variant="contained" color="secondary" className={classes.button}>
                        新規訪問記録作成
                    </Button>
                </div>
            </div>
        );
    };
}

export default withStyles(styles)(Top);