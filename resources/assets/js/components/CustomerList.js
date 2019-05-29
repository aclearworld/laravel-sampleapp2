import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNext from '@material-ui/icons/NavigateNext'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Link} from "react-router-dom";
import {commonStyle} from "./commonStyle";

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
    link: commonStyle.link,
    button: {
        ...commonStyle.button,
        margin: theme.spacing.unit,
    },
    mainContent: commonStyle.mainContent,
    list: commonStyle.list,
    listItem: {
        ...commonStyle.listItem,
        backgroundColor: theme.palette.background.paper,
    },
    footer: commonStyle.footer,
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
                            <Link key={customer.id} to={`/customer/${customer.id}`} className={classes.link}>
                                <ListItem button className={classes.listItem}>
                                    <ListItemText primary={customer.name}/>
                                    <ListItemIcon>
                                        <NavigateNext/>
                                    </ListItemIcon>
                                </ListItem>
                            </Link>
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