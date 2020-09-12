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
import { PEOPLE } from '../redux/dataTypes';
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
        <TableCell align="right">{row.height}</TableCell>
        <TableCell align="right">{row.mass}</TableCell>
        <TableCell align="right">{row.birth_year}</TableCell>
        <TableCell align="right">{row.gender}</TableCell>
        <TableCell align="right">{row.homeworld}</TableCell>
        <TableCell align="right">{row.hair_color}</TableCell>
        <TableCell align="right">{row.skin_color}</TableCell>
        <TableCell align="right">{row.eye_color}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                More details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Films</b></TableCell>
                    <TableCell><b>Species</b></TableCell>
                    <TableCell><b>Vehicles</b></TableCell>
                    <TableCell><b>Starhips</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.films.map(film=>(
                        <li key={film}>{film}</li>
                      ))}
                    </TableCell>
                    <TableCell>
                      {row.species.map(specie=>(
                        <li key={specie}>{specie}</li>
                      ))}
                    </TableCell>
                    <TableCell>
                      {row.vehicles.map(vehicle=>(
                          <li key={vehicle}>{vehicle}</li>
                      ))}
                    </TableCell>
                    <TableCell>
                      {row.starships.map(starship=>(
                          <li key={starship}>{starship}</li>
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

function PeopleList({ loading, people, error, fetchData }) {

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
            <TableCell align="right">Height</TableCell>
            <TableCell align="right">Mass</TableCell>
            <TableCell align="right">Birth year</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Home world</TableCell>
            <TableCell align="right">Hair color</TableCell>
            <TableCell align="right">Skin color</TableCell>
            <TableCell align="right">Eye color</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            people.length>0 ?
            people.map((row) => {
              return (
              <Row key={row.name} row={row} />
            )}) :
            <tr align="center"><td colSpan="14"><em>There is no match for your search</em></td></tr>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = state => {
  return {
      people: state.data,
      loading: state.loading,
      error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchData: (searchTerm) => dispatch(fetchData(PEOPLE, searchTerm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (PeopleList)