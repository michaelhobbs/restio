import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';
import {
    GetReviewsApiResponse,
    Review,
    useDeleteReviewMutation,
    useGetReviewsQuery,
    useUpdateReviewMutation,
} from '../../rtk-query/api';
import {
    ReviewComment,
    ReviewDate,
    ReviewRating,
    ReviewReply,
} from '../Inputs/Reviews';
import AdminSection from './AdminSection';

const AdminReviews: FC = () => {
    const { t } = useTranslation();

    const [deleteReview, deleteStatus] = useDeleteReviewMutation();
    const deleteWrapper = (review: Review) => {
        void deleteReview({ reviewId: review.id });
    };

    const getEditPayload = (id: number, review: Review) => ({
        reviewId: id,
        review: review,
    });

    const columns: Column<Review>[] = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Rating',
                accessor: 'rating',
            },
            {
                Header: 'Comment',
                accessor: 'comment',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Owner Reply',
                accessor: 'reply',
            },
        ],
        []
    );

    return (
        <AdminSection
            getHook={useGetReviewsQuery}
            deleteWrapper={deleteWrapper}
            deleteStatus={deleteStatus}
            editHook={useUpdateReviewMutation}
            columns={columns}
            apiToTableData={(data: GetReviewsApiResponse) => data.reviews}
            title={`${t('admin.reviews.title')}  `}
            inputFields={[ReviewComment, ReviewRating, ReviewDate, ReviewReply]}
            getEditPayload={getEditPayload}
        />
    );
};

export default AdminReviews;
