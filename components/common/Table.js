import './ui/table.scss';

import React from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash/identity';
import cn from 'classnames';

import { toTitleCase } from 'utils/formatters';

const renderValue = ({ value }) => value;

const Table = ({ className, cols, rows, getRowClass }) => (
  <table className={className}>
    <thead>
      <tr>
        {cols.map(col => {
          const { id, title = toTitleCase(id), renderTitle = () => title } = col;
          return <th key={id}>{renderTitle(col)}</th>;
        })}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={row.id} className={getRowClass(row, index)}>
          {cols.map(col => {
            const {
              id,
              prop = id,
              render = renderValue,
              formatter = identity,
              nowrap = () => false,
            } = col;
            return (
              <td key={id} className={cn(col.className, { nowrap: nowrap(row) })}>
                {render({ value: formatter(row[prop]), index, col, row })}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  cols: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prop: PropTypes.string,
      render: PropTypes.func,
      renderTitle: PropTypes.func,
      className: PropTypes.string,
    })
  ).isRequired,
  getRowClass: PropTypes.func,
};

Table.defaultProps = {
  className: 'wir-table',
  getRowClass: () => '',
};

export default Table;
