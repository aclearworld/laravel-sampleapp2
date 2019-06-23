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
import _ from 'lodash';
import {errorTypes} from "../consts";

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
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    error: commonStyle.error,
});

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isOpenModal: false,
        };
        this.id = this.props.match.params.id;
        this.isBackOnNextAction = false;
    }

    componentDidMount() {
        const {getCustomer} = this.props;
        getCustomer(this.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //顧客のアップデート
        if ((_.isEmpty(prevProps.editingCustomer) && !_.isEmpty(this.props.editingCustomer))
            || (prevProps.editingCustomer.id !== this.props.editingCustomer.id)
        ) {
            this.setState({
                name: this.props.editingCustomer.name
            });
        }

        //エラー時にモーダルを表示する
        if (prevProps.apiResult.hasError !== this.props.apiResult.hasError) {
            this.setState({
                isOpenModal: this.props.apiResult.hasError
            });
            this.isBackOnNextAction = this.props.apiResult.errorType === errorTypes.invalidOperation;
        }
    };

    handleChange(e) {
        const name = e.target.value;
        this.setState({
            name: name
        });
    };

    handleUpdateSubmit(e) {
        // e.preventDefault();
        // const {updateCustomer} = this.props;
        // updateCustomer(this.id, this.state.name);
        // this.setState({name: '', isSubmitted: true});
    };

    // handleDeleteSubmit(e) {
    //     e.preventDefault();
    //     const {id, deleteCustomer} = this.props;
    //     deleteCustomer(id, this.state.name);
    //     this.setState({name: '', isSubmitted: true});
    // };

    /**
     * 不正な顧客IDでページを開いた時は、モーダルが閉じた後に、前のページに戻る
     */
    handleModalClose() {
        if (this.isBackOnNextAction) history.back();
        this.setState({isOpenModal: false});
    };

    render() {
        const {classes, apiResult} = this.props;

        const ResultInfo = () => {
            if (!apiResult.hasError) {
                return <Typography variant="subtitle1">更新に成功しました</Typography>
            } else {
                return (
                    <React.Fragment>
                        <Typography variant="subtitle1">{apiResult.errorTitle}</Typography>
                        <Typography className={classes.error}
                                    variant="subtitle1">{apiResult.errors.invalidId[0]}</Typography>
                    </React.Fragment>
                )
            }
        };

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
                            顧客編集
                        </Typography>
                        <Button onClick={e => this.handleUpdateSubmit(e)}
                                variant="contained" color="secondary"
                                className={classes.button}>
                            更新
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
                                    更新中です...
                                </Typography>
                                <CircularProgress/>
                            </React.Fragment>
                            }
                            {!apiResult.isProcessing && <ResultInfo/>}
                        </div>
                    </Modal>

                </div>
            </div>
        );
    };

}

export default withStyles(styles)(EditCustomer);