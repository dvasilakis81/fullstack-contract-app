import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { getDateFormat } from '../../Helper/helpermethods';
import NumberFormat from 'react-number-format';

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: '#B7FFBF',
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1,
    });
  };

  getDataFormat(columnInfo, cellData) {
    var ret;

    if (columnInfo.date)
      ret = getDateFormat(cellData)
    else if (columnInfo.euro)
      ret = <NumberFormat value={cellData} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />;
    else
      ret = cellData

    return ret;
  }
  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    let cd = cellData;
    let ci = columns[columnIndex];
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight, fontWeight: 500, fontSize: 16, textAlign: 'center' }}
        align='right'
      >
        {this.getDataFormat(ci, cd)}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight, background: 'lightGreen', fontWeight: 900, fontSize: 18 }}
        align='right'
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);


function createData(id, number, start, end, amountpure, amountfpa, amounttotal) {
  return { id, number, start, end, amountpure, amountfpa, amounttotal };
}

export default class ReactVirtualizedTable extends React.Component {

  render() {
    let rows = [];
    if (this.props.createdAccounts) {

      for (let i = 0; i < this.props.createdAccounts.length - 1; i++) {
        const element = this.props.createdAccounts[i]
        rows.push(createData(i, element['Number'], element['Start'], element['End'], element['AmountPure'], element['AmountFpa'], element['AmountTotal']));
      }

      return (
        <Paper style={{ height: 400, width: 700 }}>
          <VirtualizedTable
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={[
              {
                width: '50',
                label: '#',
                dataKey: 'number'
              },
              {
                width: '150',
                label: 'Εναρξη',
                dataKey: 'start',
                date: true
              },
              {
                width: '150',
                label: 'Λήξη',
                dataKey: 'end',
                date: true
              },
              {
                width: '170',
                label: 'Καθαρό Ποσό',
                dataKey: 'amountpure',
                euro: true
              },
              {
                width: '100',
                label: 'Φ.Π.Α.',
                dataKey: 'amountfpa',
                euro: true
              },
              {
                width: '170',
                label: 'Τελικό Ποσό',
                dataKey: 'amounttotal',
                euro: true
              }
            ]}
          />
        </Paper>
      );
    }
  }
}