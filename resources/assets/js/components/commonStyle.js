import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";

const cyan100 = cyan['600'];
const teal200 = teal['200'];
const grey200 = grey['200'];
const red400 = red['400'];

export const commonStyle = {
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
    },
    link: {
        height: '100%',
        textDecoration: 'none',
        color: 'white'
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
        fontSize: '15px',
    },
    footer: {
        height: '80px',
        width: '100%',
        backgroundColor: teal200,
        display: 'flex',
        justifyContent: 'center',
    },
    textField: {
        width: 200,
    },
    error: {
        color: red400,
    },
};