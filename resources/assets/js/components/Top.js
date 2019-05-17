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
import ListSubheader from '@material-ui/core/ListSubheader';
import NavigateNext from '@material-ui/icons/NavigateNext'
import ListItemIcon from '@material-ui/core/ListItemIcon';

const cyan100 = cyan['600'];
const teal200 = teal['200'];
const grey200 = grey['200'];

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
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

class Top extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {getReports, getCustomers} = this.props;
        getReports();
        getCustomers();
    }

    handleCustomerListButtonClick(e) {
        e.preventDefault();
        const {history} = this.props;
        history.push('/customerList');
    };

    render() {
        const {classes, displayItems} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.header}>
                    <Toolbar>
                        <Typography variant="h5" color="inherit" className={classes.grow}>
                            訪問記録一覧
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.mainContent}>
                    {displayItems.map(items => (
                        <List component="nav" key={items[0].report.visit_date}
                              subheader={<ListSubheader component="div">{items[0].report.visit_date}</ListSubheader>}
                              className={classes.list}
                        >
                            {items.map(item => (
                                <ListItem key={item.report.id} button className={classes.listItem}>
                                    <ListItemText primary={item.customer.name}/>
                                    <ListItemIcon>
                                        <NavigateNext/>
                                    </ListItemIcon>
                                </ListItem>
                            ))}
                        </List>
                    ))}
                </div>

                <footer className={classes.footer}>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        新規訪問記録作成
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={e => this.handleCustomerListButtonClick(e)}>
                        顧客一覧
                    </Button>
                </footer>
            </div>
        );
    };

}

export default withStyles(styles)(Top);