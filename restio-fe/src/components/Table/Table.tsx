/* eslint-disable react/jsx-key */
// disabled react/jsx-key because react-table relies on passing key props through spread
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
import { ArrowDownward, ArrowUpward, SyncAlt } from '@material-ui/icons';
import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import {
    Column,
    FilterProps,
    Renderer,
    TableState,
    useAsyncDebounce,
    useFilters,
    useFlexLayout,
    usePagination,
    useSortBy,
    useTable,
} from 'react-table';

export type FetchData<T extends Record<string, unknown>> = (
    tableState: Pick<
        TableState<T>,
        'pageSize' | 'pageIndex' | 'sortBy' | 'filters'
    >
) => void;

type TableProps<T extends Record<string, unknown>> = {
    data: T[];
    columns: Column<T>[];
    name: string;
    onFetchData: FetchData<T>;
    pageCount: number;
};

function Table<T extends Record<string, unknown>>(
    props: PropsWithChildren<TableProps<T>>
): JSX.Element {
    // Define a default UI for filtering
    const DefaultColumnFilter = useCallback(function DefaultColumnFilter({
        column: { filterValue, setFilter },
    }: FilterProps<T>): Renderer<FilterProps<T>> {
        return (
            <input
                value={(filterValue as string) || ''}
                onChange={(e) => {
                    setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                }}
                onClick={(e) => e.stopPropagation()}
                placeholder={`Search...`}
            />
        );
    },
    []);
    const defaultColumn: Pick<Column<T>, 'Filter'> = useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        [DefaultColumnFilter]
    );

    const { data, name, columns, onFetchData, pageCount } = props;

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize, sortBy, filters },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            pageCount: pageCount,
            manualFilters: true,
            manualPagination: true,
            manualSortBy: true,
        },
        useFilters,
        useFlexLayout,
        useSortBy,
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
        onFetchDataDebounced({ pageIndex, pageSize, sortBy, filters });
        // Only the last call after the 100ms debounce is over will be fired!
    }, [onFetchDataDebounced, pageIndex, pageSize, sortBy, filters]);

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
                            <TableCell
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                            >
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <ArrowDownward fontSize="inherit" />
                                        ) : (
                                            <ArrowUpward fontSize="inherit" />
                                        )
                                    ) : column.canSort ? (
                                        <SyncAlt
                                            fontSize="inherit"
                                            color="disabled"
                                            sx={{ transform: 'rotate(90deg)' }}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </span>

                                <div>
                                    {column.canFilter
                                        ? column.render('Filter')
                                        : null}
                                </div>
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
