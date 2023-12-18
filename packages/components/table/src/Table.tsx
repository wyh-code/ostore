import React from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { IEditTableProps, IColumn } from './type'
// import { useField } from './useField';

// import Loding from './Loding';
// import Empty from './Empty';
// import Row from './Row';
// import styles from './index.module.less';

// const EditTable = (props:IEditTableProps, ref) => {
//   const { columns, dataSource, editRow, moveRow, field=useField(), loading, empty, validateDisabled, validateAllRow } = props;

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className={styles.tableContainer} ref={ref}>
//         <table className={styles.table} cellSpacing="0" cellPadding="0">
//           <thead>
//             <tr>
//               {columns.map((column: IColumn) => (
//                 <th>
//                   <div className={styles.tableFormCellWrapper} key={column.dataIndex}>
//                     {column.title}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {dataSource?.map((record, index) => (
//               <Row
//                 field={field}
//                 key={index}
//                 record={record}
//                 index={index}
//                 moveRow={moveRow}
//                 columns={columns}
//                 editRow={editRow}
//                 validateDisabled={validateDisabled}
//                 validateAllRow={validateAllRow}
//               />
//             ))}
//           </tbody>
//         </table>
//         <Loding visible={loading} />
//         {!dataSource.length && (empty || <Empty />)}
//       </div>
//     </DndProvider>
//   );
// };

// EditTable.useField = useField;

// export * from './useField';
// export default React.forwardRef(EditTable);


const EditTable = () => {
  return (
    <div>124</div>
  )
}

export default React.forwardRef(EditTable);