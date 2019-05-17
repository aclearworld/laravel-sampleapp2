import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import cyan from '@material-ui/core/colors/cyan';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const cyan100 = cyan['600'];

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: '70px',
        width: '100%',
        backgroundColor: cyan100,
    },
    button: {
        fontSize: '18px',
        margin: theme.spacing.unit,
    },
    mainContent: {
        minHeight: 'calc(100vh - 150px)',
        width: '100%',
    },
    link: {
        height: '100%',
        textDecoration: 'none',
        color: 'white'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class CreateNewCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    handleChange(e) {
        const name = e.target.value;
        this.setState({
            name: name
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        const {createNewCustomer} = this.props;
        createNewCustomer(this.state.name);
        this.setState({name: ''});
    };

    render() {
        const {classes, apiResult} = this.props;
        console.log(apiResult);

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.header}>
                    <Toolbar>
                        <Link to="/customerList" className={classes.link}>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                Back
                            </Typography>
                        </Link>
                        <Typography variant="h5" color="inherit" className={classes.grow}>
                            顧客新規作成
                        </Typography>
                        <Button onClick={e => this.handleSubmit(e)} variant="contained" color="secondary"
                                className={classes.button}>
                            登録
                        </Button>
                    </Toolbar>
                </AppBar>

                <div className={classes.mainContent}>
                    <TextField
                        label="名称"
                        className={classes.textField}
                        margin="normal"
                        placeholder="顧客名"
                        value={this.state.name}
                        onChange={e => this.handleChange(e)}
                    />
                </div>

            </div>
        );
    };

}

export default withStyles(styles)(CreateNewCustomer);