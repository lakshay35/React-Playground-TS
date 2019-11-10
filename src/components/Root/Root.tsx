import * as React from 'react';;

import './Root.scss';

import Login from '../../views/Login/Login';
import Register from '../Register/Register';
import Home from '../../views/Home/Home';
import PortfolioBuilder from '../../views/PortfolioBuilder/PortfolioBuilder';
import StockScreener from '../StockScreener/StockScreener';
import Trades from '../TradesTable/TradesTable';
import NotFound from '../NotFound/NotFound';

import classNames from 'classnames';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';

import { fade } from '@material-ui/core/styles/colorManipulator';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@material-ui/core/Modal'
import InputBase from '@material-ui/core/InputBase';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { connect } from 'react-redux';
import { setPageTitle } from '../../redux/actions/page';

import {
    Route,
    Redirect,
    Switch,
    withRouter,
    RouteComponentProps
} from 'react-router-dom';
import { Dispatch } from 'redux';
import { History } from 'history';

type State = {
    pageTitle: string,
    open: boolean
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setPageTitle: (title: String) => dispatch(setPageTitle(title))
    }
}

const mapStateToProps = (state: State) => {
    return {
        pageTitle: state.pageTitle
    }
}
const drawerWidth = '20%';

const styles = (theme: Theme) => createStyles({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    root: {
        display: 'grid',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: '#72baea'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth})`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

interface Props extends WithStyles<typeof styles> {
    setPageTitle: (path: string) => void,
    history?: History<any>
}

interface RouterProps extends RouteComponentProps<{}> {

}

class Root extends React.Component<Props & RouterProps, State> {

    state: State = {
        pageTitle: 'Login',
        open: false
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    navigateTo = (path: string) => {
        this.setState({
            open: false
        });
        this.props.setPageTitle(this.getPageTitle(path));
        this.props.history.push(path);
    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            pageTitle: nextProps.pageTitle
        });
    }

    getPageTitle(path: string) {
        switch (path) {
            case '/login':
                return 'Login';
            case '/register':
                return 'Register';
            case '/home':
                return 'Home'
            case '/portfoliobuilder':
                return 'Portfolio Builder';
            case '/trades':
                return 'Trades';
            case '/stockscreener':
                return 'Stock Screener';
            default:
                return 'Home'
        }
    }


    render() {

        const { classes } = this.props;
        const { open } = this.state;

        return (

            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            {this.state.pageTitle}
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <Modal open={this.state.open} onClose={this.handleDrawerClose}>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {sessionStorage.getItem('loggedin') !== 'true' ? (
                            <List>
                                <ListItem onClick={() => this.navigateTo('/login')} className="option" button key="Login">
                                    {/* <ListItemIcon> <ExitToAppIcon /> </ListItemIcon> */}
                                    <ListItemText primary="Login" />
                                </ListItem>
                                <Divider />
                                <ListItem onClick={() => this.navigateTo('/register')} className="option" button key="Register">
                                    {/* <ListItemIcon> <PersonAddIcon />  'PersonAddIcon' </ListItemIcon> */}
                                    <ListItemText primary="Register" />
                                </ListItem>
                            </List>
                        ) : (
                                <List>
                                    <ListItem onClick={() => this.navigateTo('/home')} className="option" button key="Home">
                                        {/* <ListItemIcon><HomeIcon /> </ListItemIcon> */}
                                        <ListItemText primary="Home" />
                                    </ListItem>
                                    <Divider />
                                    <ListItem onClick={() => this.navigateTo('/trades')} className="option" button key="Trades">
                                        {/* <ListItemIcon> <MonetizationOnIcon /> </ListItemIcon> */}
                                        <ListItemText primary="Trades" />
                                    </ListItem>
                                    <Divider />
                                    <ListItem onClick={() => this.navigateTo('/portfoliobuilder')} className="option" button key="Portfolio Generator">
                                        {/* <ListItemIcon> <CreateIcon /> </ListItemIcon> */}
                                        <ListItemText primary="Portfolio Builder" />
                                    </ListItem>
                                    <Divider />
                                    <ListItem onClick={() => this.navigateTo('/stockscreener')} className="option" button key="Stock Screener">
                                        {/* <ListItemIcon> <FilterListIcon /> </ListItemIcon> */}
                                        <ListItemText primary="Stock Screener" />
                                    </ListItem>
                                    <Divider />
                                    <ListItem onClick={() => {
                                        sessionStorage.removeItem('loggedin');
                                        this.navigateTo('/login');
                                    }} className="option" button key="Logout">
                                        {/* <ListItemIcon> <PowerSettingsNewIcon /> </ListItemIcon> */}
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                    <Divider />
                                </List>
                            )}

                    </Drawer>
                </Modal>
                <Switch >
                    <Route exact path="/" render={() => (
                        <Redirect to='/home' />
                    )} />
                    <Route exact path="/home" render={() => (
                        sessionStorage.getItem('loggedin') === 'true' ? (
                            <Home history={this.props.history} />
                        ) : (
                                <Redirect to='/login' />
                            )
                    )} />
                    <Route exact path="/trades" render={() => (
                        sessionStorage.getItem('loggedin') === 'true' ? (
                            <Trades history={this.props.history} />
                        ) : (
                                <Redirect to='/login' />
                            )
                    )} />
                    <Route exact path="/stockscreener" render={() => (
                        sessionStorage.getItem('loggedin') === 'true' ? (
                            <StockScreener history={this.props.history} />
                        ) : (
                                <Redirect to='/login' />
                            )
                    )} />
                    <Route exact path="/portfoliobuilder" render={() => (
                        sessionStorage.getItem('loggedin') === 'true' ? (
                            <PortfolioBuilder history={this.props.history} />
                        ) : (
                                <Redirect to='/login' />
                            )
                    )} />
                    <Route exact path="/login" render={() => (
                        sessionStorage.getItem('loggedin') !== 'true' ? (
                            <Login history={this.props.history} />
                        ) : (
                                <Redirect to='/home' />
                            )
                    )} />
                    <Route exact path="/register" render={() => (
                        sessionStorage.getItem('loggedin') !== 'true' ? (
                            <Register history={this.props.history} />
                        ) : (
                                <Redirect to='/home' />
                            )
                    )} />
                    <Route history={this.props.history} render={() => (
                        <NotFound history={this.props.history} />
                    )} />
                </Switch>
            </div>
        );
    }
}

const RootComponent = connect(mapStateToProps, mapDispatchToProps)(Root);

export default withRouter(withStyles(styles, { withTheme: true })(RootComponent));
