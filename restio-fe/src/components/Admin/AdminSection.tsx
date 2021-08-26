import {
    Box,
    CircularProgress,
    Dialog,
    IconButton,
    Paper,
    TableContainer,
    Typography,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { RequestStatusFlags } from '@reduxjs/toolkit/dist/query/core/apiState';
import {
    UseMutation,
    UseQuery,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { FC, useMemo, useState } from 'react';
import { UnpackNestedValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CellProps, Column } from 'react-table';
import {
    GetRestaurantsApiResponse,
    GetReviewsApiResponse,
    GetUsersApiResponse,
    Restaurant,
    Review,
    UpdateRestaurantApiArg,
    UpdateReviewApiArg,
    UpdateUserApiArg,
    User,
} from '../../rtk-query/api.generated';
import DeleteConfirmationDialog from '../Dialogs/DeleteConfirmationDialog';
import EditDialog from '../Dialogs/EditDialog';
import { InputProps } from '../Inputs';
import Table, { FetchData } from '../Table/Table';

type DialogType = 'DELETE' | 'EDIT';

type AdminSectionProps<T extends Record<string, unknown>> = {
    getHook: UseQuery<
        QueryDefinition<
            any,
            any,
            any,
            | GetUsersApiResponse
            | GetRestaurantsApiResponse
            | GetReviewsApiResponse,
            any
        >
    >;
    deleteWrapper: (item: T) => void;
    deleteStatus: RequestStatusFlags;
    editHook: UseMutation<any>;
    columns: Column<T>[];
    apiToTableData: (
        apiResponse:
            | GetUsersApiResponse
            | GetRestaurantsApiResponse
            | GetReviewsApiResponse
    ) => T[] | undefined;
    title: string;
    inputFields: FC<InputProps>[];
    getEditPayload: (
        id: number,
        item: UnpackNestedValue<T>
    ) => UpdateUserApiArg | UpdateRestaurantApiArg | UpdateReviewApiArg;
};

function AdminSection<T extends User | Review | Restaurant>({
    getHook,
    deleteWrapper,
    deleteStatus,
    editHook,
    columns,
    apiToTableData,
    title,
    inputFields,
    getEditPayload,
}: AdminSectionProps<T>): JSX.Element {
    const { t } = useTranslation();
    const [queryParams, setQueryParams] = useState({
        _page: 1,
        _limit: 10,
    });
    const [dialogOpen, setDialogOpen] = useState<boolean>();
    const [dialogType, setDialogType] = useState<DialogType>();
    const [dialogData, setDialogData] = useState<T>();

    const { data = {}, isError, isFetching, refetch } = getHook(queryParams);

    const openDialog = (type: DialogType) => {
        setDialogOpen(true);
        setDialogType(type);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };
    const resetDialogData = () => {
        setDialogData(undefined);
        setDialogType(undefined);
    };

    const handleCloseDialog = (shouldRefetch?: boolean) => {
        closeDialog();
        if (shouldRefetch) {
            refetch();
        }
    };

    const tableData = useMemo(
        () => apiToTableData(data),
        [data, apiToTableData]
    );
    const cols: Column<T>[] = useMemo(() => {
        const ActionsCell = (cell: CellProps<T>) => {
            return (
                <Box pr={2}>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setDialogData(cell.row.original);
                            openDialog('DELETE');
                        }}
                    >
                        <Delete />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setDialogData(cell.row.original);
                            openDialog('EDIT');
                        }}
                    >
                        <Edit />
                    </IconButton>
                </Box>
            );
        };
        return [
            ...columns,
            {
                id: 'actions',
                Cell: ActionsCell,
            },
        ];
    }, [columns]);

    const fetchData: FetchData<T> = ({ pageIndex, pageSize }) => {
        setQueryParams({ _page: pageIndex + 1, _limit: pageSize });
    };

    return (
        <>
            <Box mb={8}>
                <Typography variant="h6" gutterBottom>
                    {title}
                    {isFetching && <CircularProgress size={20} />}
                </Typography>
                {tableData && (
                    <TableContainer component={Paper}>
                        <Table<T>
                            data={tableData}
                            columns={cols}
                            name={'table'}
                            onFetchData={fetchData}
                            pageCount={data?.pagination?.total_count ?? 0}
                        />
                    </TableContainer>
                )}
                {isError && (
                    <Alert severity="error">{t('error.default')}</Alert>
                )}
            </Box>
            {dialogOpen && dialogData && (
                <Dialog
                    open={!!dialogOpen}
                    onClose={closeDialog}
                    TransitionProps={{ onExited: resetDialogData }}
                >
                    {dialogType === 'DELETE' && (
                        <DeleteConfirmationDialog
                            dialogData={dialogData}
                            handleClose={handleCloseDialog}
                            apiCall={deleteWrapper}
                            apiCallStatus={deleteStatus}
                        />
                    )}
                    {dialogType === 'EDIT' && (
                        <EditDialog
                            dialogData={dialogData}
                            handleClose={handleCloseDialog}
                            editHook={editHook}
                            inputFields={inputFields}
                            getEditPayload={getEditPayload}
                        />
                    )}
                </Dialog>
            )}
        </>
    );
}

export default AdminSection;
