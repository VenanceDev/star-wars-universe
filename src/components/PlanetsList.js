import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { PLANETS } from '../redux/dataTypes';
import { fetchData } from '../redux/actions';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.population}</TableCell>
        <TableCell align="right">{row.diameter}</TableCell>
        <TableCell align="right">{row.climate}</TableCell>
        <TableCell align="right">{row.gravity}</TableCell>
        <TableCell align="right">{row.terrain}</TableCell>
        <TableCell align="right">{row.rotation_period}</TableCell>
        <TableCell align="right">{row.orbital_period}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                More details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Surface water</b></TableCell>
                    <TableCell><b>Residents</b></TableCell>
                    <TableCell><b>Films</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.surface_water}
                    </TableCell>
                    <TableCell>
                      {row.residents.map(resident=>(
                        <li key={resident}>{resident}</li>
                      ))}
                    </TableCell>
                    <TableCell>
                      {row.films.map(film=>(
                          <li key={film}>{film}</li>
                      ))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function PlanetsList({ loading, planets, error, fetchData }) {

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
return loading ? <CircularProgress color="secondary" /> : error ? <h2>{ error }</h2> : (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" stickyHeader>
        <TableHead className="me-table-head">
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Population</TableCell>
            <TableCell align="right">Diameter</TableCell>
            <TableCell align="right">Climate</TableCell>
            <TableCell align="right">Gravity</TableCell>
            <TableCell align="right">Terrain</TableCell>
            <TableCell align="right">Rotation period</TableCell>
            <TableCell align="right">Orbital period</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            planets.length>0 ?
            planets.map((row) => {
              return (
              <Row key={row.name} row={row} />
            )}) :
            <tr align="center"><td colSpan="8"><em>There is no match for your search</em></td></tr>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = state => {
  return {
      planets: state.data,
      loading: state.loading,
      error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchData: (searchTerm) => dispatch(fetchData(PLANETS, searchTerm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (PlanetsList)