import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IEditTableProps, IColumn } from './type'
import { useField } from './useField';

// import Loading from './Loading';
// import Empty from './Empty';
import Row from './Row';
import './index.less';

const Table = (props:IEditTableProps, ref: React.RefObject<HTMLDivElement>) => {
  const { 
    columns, 
    hasBorder=true,
    dataSource, 
    editRow, 
    moveRow, 
    field=useField(), 
    loading, 
    empty, 
    validateDisabled, 
    validateAllRow 
  } = props;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`ostore-table-container ${ hasBorder? 'ostore-table-container-border' : ''}`} ref={ref}>
        <table className="ostore-table">
          <thead>
            <tr>
              {columns.map((column: IColumn) => (
                <th className="ostore-table-cell-wrapper" key={column.dataIndex}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource?.map((record, index) => (
              <Row
                field={field}
                key={index}
                record={record}
                index={index}
                moveRow={moveRow}
                columns={columns}
                editRow={editRow}
                validateDisabled={validateDisabled}
                validateAllRow={validateAllRow}
              />
            ))}
          </tbody>
        </table>
        {/* <Loading visible={loading} />
        {!dataSource.length && (empty || <Empty />)} */}
      </div>
    </DndProvider>
  );
};


Table.useField = useField;

export { useField } from './useField';
export default React.forwardRef(Table);
