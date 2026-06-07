// components/TableComponent.tsx
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

interface TableComponentProps<T> {
  columns: ColumnsType<T>;
  dataSource: T[];
  rowKey: string | ((record: T) => string);
  loading?: boolean;
  pagination?: TablePaginationConfig | false;
  onChange?: (pagination: TablePaginationConfig, filters: any, sorter: any) => void;
  children?: React.ReactNode;
}

function TableComponent<T extends object>({
  columns,
  dataSource,
  rowKey,
  loading = false,
  pagination,
  onChange,
  children,
}: TableComponentProps<T>) {
  return (
    <>
      {children}
      <Table<T>
        columns={columns}
        dataSource={dataSource}
        rowKey={rowKey}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </>
  );
}

export default TableComponent;