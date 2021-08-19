import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableCellProps,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { PropsWithChildren, useEffect } from 'react';
import { Column, useAsyncDebounce, usePagination, useTable } from 'react-table';

type TableProps<T extends Record<string, unknown>> = {
    data: T[];
    columns: Column<T>[];
    name: string;
    onFetchData: any;
    pageCount: any;
};

function Table<T extends Record<string, unknown>>(
    props: PropsWithChildren<TableProps<T>>
) {
    const { data, name, columns, onFetchData, pageCount } = props;

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            pageCount: pageCount,
            manualPagination: true,
        },
        usePagination
    );

    const handleChangePage: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        page: number
    ) => void = (_, newPage) => {
        gotoPage(newPage);
    };

    const handleChangeRowsPerPage: React.ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    > = (event) => {
        setPageSize(Number(event?.target.value));
    };

    // Debounce our onFetchData call for 100ms
    const onFetchDataDebounced = useAsyncDebounce(onFetchData, 100);

    // When the these table states changes, fetch new data!
    useEffect(() => {
        // Every change will call our debounced function
        onFetchDataDebounced({ pageIndex, pageSize });
        // Only the last call after the 100ms debounce is over will be fired!
    }, [onFetchDataDebounced, pageIndex, pageSize]);

    return (
        <MuiTable
            {...getTableProps()}
            size="small"
            aria-label={`${name}-table`}
        >
            <TableHead>
                {headerGroups.map((headerGroup) => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <TableCell {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <TableRow {...row.getRowProps()} hover>
                            {row.cells.map((cell) => {
                                const extraProps: Partial<TableCellProps> =
                                    cell.column.id === 'actions'
                                        ? {
                                              align: 'right',
                                              padding: 'none',
                                          }
                                        : {};
                                return (
                                    <TableCell
                                        {...cell.getCellProps()}
                                        {...extraProps}
                                    >
                                        {cell.render('Cell')}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        count={pageCount}
                        rowsPerPage={pageSize}
                        page={pageIndex}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </MuiTable>
    );
}

export default Table;
