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
import { STARSHIPS } from '../redux/dataTypes';
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
        <TableCell align="right">{row.model}</TableCell>
        <TableCell align="right">{row.manufacturer}</TableCell>
        <TableCell align="right">{row.cost_in_credits}</TableCell>
        <TableCell align="right">{row.length}</TableCell>
        <TableCell align="right">{row.crew}</TableCell>
        <TableCell align="right">{row.passengers}</TableCell>
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
                    <TableCell><b>Cargo capacity</b></TableCell>
                    <TableCell><b>Consumables</b></TableCell>
                    <TableCell><b>Hyperdrive rating</b></TableCell>
                    <TableCell><b>MGLT</b></TableCell>
                    <TableCell><b>Starship class</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.cargo_capacity}
                    </TableCell>
                    <TableCell>
                      {row.consumables}
                    </TableCell>
                    <TableCell>
                      {row.hyperdrive_rating}
                    </TableCell>
                    <TableCell>
                      {row.MGLT}
                    </TableCell>
                    <TableCell>
                      {row.starship_class}
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

function StarshipsList({ loading, starships, error, fetchData }) {

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
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">Manufacturer</TableCell>
            <TableCell align="right">Cost &nbsp;(in credits)</TableCell>
            <TableCell align="right">Length</TableCell>
            <TableCell align="right">Crew</TableCell>
            <TableCell align="right">Passengers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            starships.length>0 ?
            starships.map((row) => {
              return (
              <Row key={row.name} row={row} />
            )}) :
            <tr align="center"><td colSpan="7"><em>There is no match for your search</em></td></tr>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = state => {
  return {
      starships: state.data,
      loading: state.loading,
      error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchData: (searchTerm) => dispatch(fetchData(STARSHIPS, searchTerm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (StarshipsList)