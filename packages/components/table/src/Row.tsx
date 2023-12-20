import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IRowProps, TYPE } from './type.d';
import Cell from './Cell';

export default ({ columns, record, index, moveRow, editRow, field, validateDisabled, validateAllRow }: IRowProps) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    // 初始化编辑数据
    field.setFieldValues(index, record)
  }, [JSON.stringify(record)])

  const [, drop] = useDrop({
    // 一个字符串，这个放置目标只会对指定类型的拖动源发生反应
    accept: TYPE,
    collect: () => ({}),
    hover(item: any, monitor) {
      // 获取被拖动的卡片的索引 0
      const dragIndex = item.index;// 0
      // 当前正在hover卡片的索引 1
      const hoverIndex = index;// 1
      if (dragIndex === hoverIndex) {
        return;
      }
      const { top, bottom } = ref.current.getBoundingClientRect();
      const halfOfHoverHeight = (bottom - top) / 2;
      const y = monitor.getClientOffset()!.y;
      const hoverClientY = y - top;
      if ((dragIndex < hoverIndex && hoverClientY > halfOfHoverHeight)
        || (dragIndex > hoverIndex && hoverClientY < halfOfHoverHeight)
      ) {
        moveRow && moveRow(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TYPE,
    item: () => ({ id: record.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // 有 moveRow 函数则开启拖拽
  if(moveRow){
    drag(ref);
    drop(ref);
  }

  return (
    <tr ref={ref} style={{ opacity: isDragging ? 0.3 : 1 }}>
      {columns.map((column) => (
        <Cell
          key={`${column.dataIndex}-${index}`}
          column={column}
          record={record}
          index={index}
          editRow={editRow}
          validateDisabled={validateDisabled}
          validateAllRow={validateAllRow}
          field={field}
        />
      ))}
    </tr>
  );
};
