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
const teal200 = teal['200'];

const styles = theme => ({
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
        margin: theme.spacing.unit,
    },
    mainContent: {
        height: '80%',
        width: '100%',
    },
    footer: {
        height: '10%',
        width: '100%',
        backgroundColor: teal200,
        display: 'flex',
        justifyContent: 'center',
    },
});

class Top extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const getReports = this.props.getReports;
        console.log(getReports);
        getReports();
    }

    render() {
        const {classes, reports} = this.props;
        console.log(reports);

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.header}>
                    <Toolbar>
                        <Typography variant="h3" color="inherit" className={classes.grow}>
                            訪問記録一覧
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.mainContent}>
                    <ul>
                        {reports.map(report => (
                            <li key={report.id}>{report.detail}</li>
                        ))}
                    </ul>
                </div>

                <footer className={classes.footer}>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        新規訪問記録作成
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        顧客一覧
                    </Button>
                </footer>
            </div>
        );
    };
}

export default withStyles(styles)(Top);