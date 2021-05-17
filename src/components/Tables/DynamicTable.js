import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Link,
} from '@material-ui/core';
// import Loading from '../Loading/Loading';
// import { format } from '../../utils/format';



/**
 * OBJ represents JSON data
 * @param {object}
 * @param {array}
*/

const DynamicTable = ({ obj, actions }) => {
  const [data, setData] = React.useState(obj);
 
  // we don't need the ID in the header column; could make it optional in case we do or hide it completely.
  const createTableHeader = (json) => {
    // hide id for table header for each object in this array
    // does this affect delete operation?
    const noId = json.games.map(({ id, ...noId }) => noId);
    console.log(noId);
    return Object.keys(noId[0]).map((key, index) => {
      return (<TableCell component="th" align="left" key={index}>{key}</TableCell>) // mapped over the enumerable props and displayed them
    });
  };

  const createTableBody = (json) => {
    return json.games.map(game => {
      return (
        <TableRow key={game.id}>
          <TableCell>
            {game.location}
          </TableCell>
          <TableCell>
            {game.courseName}
          </TableCell>
          <TableCell>
            {game.questions}
          </TableCell>
          <TableCell>
            {game.levels}
          </TableCell>
          <TableCell>
            {game.avg}
          </TableCell>
          <TableCell>
            {createTableActions(['EDIT','DUPLICATE','DELETE'])}
          </TableCell>
        </TableRow>
      );
    })
  };

  /**
   * Generates CRUD actions based on function arguments -- an array of strings.
   * @param {array} 
  */
  
  const createTableActions = ([...args]) => {
    if (!actions) {
      return null
    }
    return [...args].map((action, index) => {
      return ( <Link to="#" rel="noopener noreferrer" key={index}>{action}</Link> )
    });
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {createTableHeader(data)}
          </TableRow>
        </TableHead>
        <TableBody>
          {createTableBody(data)}
        </TableBody>
      </Table>
    </div>
  )
};

DynamicTable.propTypes = {
  obj: PropTypes.object.isRequired,
};

export default DynamicTable;
