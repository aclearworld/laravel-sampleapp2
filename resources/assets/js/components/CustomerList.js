import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal'
import grey from '@material-ui/core/colors/grey'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNext from '@material-ui/icons/NavigateNext'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Link} from "react-router-dom";

const cyan100 = cyan['600'];
const teal200 = teal['200'];
const grey200 = grey['200'];

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
        height: '50px',
        width: '100%',
        backgroundColor: cyan100,
    },
    link: {
        height: '100%',
        textDecoration: 'none',
        color: 'white'
    },
    button: {
        fontSize: '18px',
        margin: theme.spacing.unit,
    },
    mainContent: {
        minHeight: 'calc(100vh - 130px)',
        width: '100%',
    },
    list: {
        width: '100%',
        backgroundColor: grey200,
        fontSize: '15px',
    },
    listItem: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        fontSize: '15px',
    },
    footer: {
        height: '80px',
        width: '100%',
        backgroundColor: teal200,
        display: 'flex',
        justifyContent: 'center',
    },
});

class CustomerList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {getCustomers} = this.props;
        getCustomers();
    }

    handleAddCustomerClick(e) {
        e.preventDefault();
        const {history} = this.props;
        history.push('/addCustomer');
    }

    render() {
        const {classes, customers} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.header}>
                    <Toolbar>
                        <Link to="/" className={classes.link}>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                Close
                            </Typography>
                        </Link>
                        <Typography variant="h5" color="inherit" className={classes.grow}>
                            顧客一覧
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.mainContent}>
                    <List component="nav" className={classes.list}>
                        {customers.map(customer => (
                            <ListItem key={customer.id} button className={classes.listItem}>
                                <ListItemText primary={customer.name}/>
                                <ListItemIcon>
                                    <NavigateNext/>
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </div>

                <footer className={classes.footer}>
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={e => this.handleAddCustomerClick(e)}>
                        新規追加
                    </Button>
                </footer>
            </div>
        );
    };


}

export default withStyles(styles)(CustomerList);