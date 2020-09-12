import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { PEOPLE, PLANETS, STARSHIPS } from '../redux/dataTypes';
import { fetchData } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


function SearchBar({ fetchData }) {
  const classes = useStyles();
  
  return (
    <div style={{display:'flex', paddingBottom:'5px'}}>
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search here"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e)=>{
            const currentLink = window.location.pathname
            const dataType = currentLink === '/people' ? PEOPLE : currentLink === '/planets' ? PLANETS : STARSHIPS
            fetchData(dataType, e.target.value)
        }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={(e)=>{e.preventDefault()}}>
        <SearchIcon />
      </IconButton>
    </Paper>
      </div>
  );
}


const mapDispatchToProps = dispatch => {
  return {
      fetchData: (dataType, searchTerm) => dispatch(fetchData(dataType, searchTerm))
  }
}

export default connect(null, mapDispatchToProps) (SearchBar)
