import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal'
import Button from '@material-ui/core/Button';

const cyan100 = cyan['600'];
const teal200 = cyan['200'];

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    header: {
        height: '10%',
        width: '100%',
        backgroundColor: cyan100,
    },
    button: {
        fontSize: '20px',
        margin: 'auto',
        marginTop: '20px',
    },
    mainContentWrap: {
        display: 'flex',
        height: '80%',
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
                <AppBar position="static" className={classes.header}>
                    <Toolbar>
                        <Typography variant="h3" color="inherit" className={classes.grow}>
                            訪問記録一覧
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.mainContentWrap}>

                    <Button variant="contained" color="secondary" className={classes.button}>
                        新規訪問記録作成
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        顧客一覧
                    </Button>
                </div>
            </div>
        );
    };
}

export default withStyles(styles)(Top);