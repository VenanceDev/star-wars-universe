import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './AppContent.css'
import PeopleList from './PeopleList';
import SearchBar from './SearchBar';
import PlanetsList from './PlanetsList';
import StarshipsList from './StarshipsList';
import { connect } from 'react-redux';
import { PEOPLE, PLANETS, STARSHIPS } from '../redux/dataTypes';
import { fetchData } from '../redux/actions';

// ================================ DESIGN OPTIONS ==================================
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
// ==================================================================


// ================================ FUNCTIONAL COMPONENT ==================================
function AppContent(props) {
  const { windows } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeLink, setActiveLink] = useState(window.location.pathname)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickLink = (currentLink) => {
    const dataType = currentLink === '/people' ? PEOPLE : currentLink === '/planets' ? PLANETS : STARSHIPS
    props.fetchData(dataType)
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List onClick={(e)=>{
                        setActiveLink(window.location.pathname)
                        handleClickLink(window.location.pathname)
                      }}>
        {[{text:'People', path: '/people', icon: 'people'}, 
            {text:'Planets', path: '/planets', icon: 'public'},
            {text:'Starships', path: '/starships', icon: 'flight'}].map((link, index) => (
            <ListItem button key={index}
                      component={Link}
                      to={link.path}
                      className={activeLink === link.path ? 'drawer-menu-selected' : (link.path === '/people' && activeLink === '/') ? 'drawer-menu-selected' : '' }>
              <ListItemIcon> <Icon>{link.icon}</Icon> </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItem>
        ))}
      </List>
    </div>
  );

  const container = windows !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
    <Router>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{backgroundColor: '#242424'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <strong><span style={{color: 'orange'}}>StarWars-</span> &nbsp;{activeLink === '/people' ? "People page" : activeLink === '/' ? "People page" : activeLink === '/planets' ?  "Planets page" : activeLink === '/starships' ? "Starships page" : "Unknown" }</strong>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SearchBar />
        <Switch>
            <Redirect exact from="/" to="/people" />
            <Route exact path='/people'>
                <PeopleList />
            </Route>
            <Route exact path='/planets'>
                <PlanetsList />
            </Route>
            <Route exact path='/starships'>
                <StarshipsList />
            </Route>
        </Switch>
      </main>
      </Router>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
      fetchData: (dataType) => dispatch(fetchData(dataType))
  }
}

export default connect(null, mapDispatchToProps) (AppContent);
