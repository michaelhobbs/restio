import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';
import {
    GetUsersApiResponse,
    useDeleteUserMutation,
    useGetUsersQuery,
    User,
    useUpdateUserMutation,
} from '../../rtk-query/api';
import { UserEmail, UserName, UserRole } from '../Inputs/Users';
import AdminSection from './AdminSection';

const AdminUsers = (): JSX.Element => {
    const { t } = useTranslation();

    const [deleteUser, deleteStatus] = useDeleteUserMutation();
    const deleteWrapper = (user: User) => {
        void deleteUser({ userId: user.id });
    };

    const getEditPayload = (id: number, user: User) => ({
        userId: id,
        user: user,
    });

    const columns: Column<User>[] = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'E-mail',
                accessor: 'email',
            },
            {
                Header: 'Role',
                accessor: 'role',
            },
        ],
        []
    );

    return (
        <AdminSection
            getHook={useGetUsersQuery}
            deleteWrapper={deleteWrapper}
            deleteStatus={deleteStatus}
            editHook={useUpdateUserMutation}
            columns={columns}
            apiToTableData={(data: GetUsersApiResponse) => data.users}
            title={`${t('admin.users.title')}  `}
            inputFields={[UserName, UserEmail, UserRole]}
            getEditPayload={getEditPayload}
        />
    );
};

export default AdminUsers;
