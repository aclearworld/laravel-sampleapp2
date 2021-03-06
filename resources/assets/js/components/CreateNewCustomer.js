import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import {commonStyle} from "./commonStyle";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import {ResultInfo} from "./commons";

const styles = theme => ({
    root: commonStyle.root,
    grow: {
        ...commonStyle.grow,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: commonStyle.header,
    button: {
        ...commonStyle.button,
        margin: theme.spacing.unit,
    },
    mainContent: commonStyle.mainContent,
    link: commonStyle.link,
    textField: {
        ...commonStyle.textField,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    paper: {
        ...commonStyle.paper,
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    error: commonStyle.error,
});

class CreateNewCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isOpenModal: false,
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
        this.setState({name: '', isOpenModal: true});
    };

    handleModalClose() {
        this.setState({isOpenModal: false});
    };

    render() {
        const {classes, apiResult} = this.props;
        const displayErrors = [{key: 'name', indexs: [0]}];

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
                        <Button disabled={apiResult.isProcessing} onClick={e => this.handleSubmit(e)}
                                variant="contained" color="secondary"
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

                    <Modal
                        open={this.state.isOpenModal}
                        onClose={() => this.handleModalClose()}
                    >
                        <div className={classes.paper}>
                            {apiResult.isProcessing &&
                            <React.Fragment>
                                <Typography variant="h6">
                                    登録中です...
                                </Typography>
                                <CircularProgress/>
                            </React.Fragment>
                            }
                            {!apiResult.isProcessing &&
                            <ResultInfo successMsg="登録に成功しました" apiResult={apiResult} displayErrors={displayErrors}/>}
                        </div>
                    </Modal>

                </div>
            </div>
        );
    };

}

export default withStyles(styles)(CreateNewCustomer);
