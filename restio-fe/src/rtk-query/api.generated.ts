import { createApi } from '@reduxjs/toolkit/query/react';
import { default as customBaseQuery } from './customBaseQuery';
export const api = createApi({
    baseQuery: customBaseQuery,
    tagTypes: [],
    endpoints: (build) => ({
        login: build.mutation<LoginApiResponse, LoginApiArg>({
            query: (queryArg) => ({
                url: `/auth/login`,
                method: 'POST',
                body: queryArg.userCredentials,
            }),
        }),
        logout: build.query<LogoutApiResponse, LogoutApiArg>({
            query: () => ({ url: `/auth/logout` }),
        }),
        signUp: build.mutation<SignUpApiResponse, SignUpApiArg>({
            query: (queryArg) => ({
                url: `/auth/signup`,
                method: 'POST',
                body: queryArg.userSignUpCredentials,
            }),
        }),
        getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
            query: (queryArg) => ({
                url: `/users`,
                params: {
                    _page: queryArg._page,
                    _limit: queryArg._limit,
                    filter: queryArg.filter,
                    sort: queryArg.sort,
                },
            }),
        }),
        postUser: build.mutation<PostUserApiResponse, PostUserApiArg>({
            query: (queryArg) => ({
                url: `/users`,
                method: 'POST',
                body: queryArg.userSignUpCredentials,
            }),
        }),
        updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
            query: (queryArg) => ({
                url: `/users/${queryArg.userId}`,
                method: 'PUT',
                body: queryArg.user,
            }),
        }),
        deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
            query: (queryArg) => ({
                url: `/users/${queryArg.userId}`,
                method: 'DELETE',
            }),
        }),
        loginUser: build.mutation<LoginUserApiResponse, LoginUserApiArg>({
            query: (queryArg) => ({
                url: `/users/login`,
                method: 'POST',
                body: queryArg.userCredentials,
            }),
        }),
        logoutUser: build.query<LogoutUserApiResponse, LogoutUserApiArg>({
            query: () => ({ url: `/users/logout` }),
        }),
        getRestaurants: build.query<
            GetRestaurantsApiResponse,
            GetRestaurantsApiArg
        >({
            query: (queryArg) => ({
                url: `/restaurants`,
                params: {
                    minRating: queryArg.minRating,
                    _page: queryArg._page,
                    _limit: queryArg._limit,
                    filter: queryArg.filter,
                    sort: queryArg.sort,
                },
            }),
        }),
        postRestaurant: build.mutation<
            PostRestaurantApiResponse,
            PostRestaurantApiArg
        >({
            query: (queryArg) => ({
                url: `/restaurants`,
                method: 'POST',
                body: queryArg.restaurantNew,
            }),
        }),
        getRestaurantById: build.query<
            GetRestaurantByIdApiResponse,
            GetRestaurantByIdApiArg
        >({
            query: (queryArg) => ({
                url: `/restaurants/${queryArg.restaurantId}`,
            }),
        }),
        updateRestaurant: build.mutation<
            UpdateRestaurantApiResponse,
            UpdateRestaurantApiArg
        >({
            query: (queryArg) => ({
                url: `/restaurants/${queryArg.restaurantId}`,
                method: 'PUT',
                body: queryArg.restaurantBase,
            }),
        }),
        deleteRestaurant: build.mutation<
            DeleteRestaurantApiResponse,
            DeleteRestaurantApiArg
        >({
            query: (queryArg) => ({
                url: `/restaurants/${queryArg.restaurantId}`,
                method: 'DELETE',
            }),
        }),
        getRestaurantPendingReviews: build.query<
            GetRestaurantPendingReviewsApiResponse,
            GetRestaurantPendingReviewsApiArg
        >({
            query: (queryArg) => ({
                url: `/restaurants/${queryArg.restaurantId}/pendingReviews`,
                params: { _page: queryArg._page, _limit: queryArg._limit },
            }),
        }),
        getRestaurantReviews: build.query<
            GetRestaurantReviewsApiResponse,
            GetRestaurantReviewsApiArg
        >({
            query: (queryArg) => ({
                url: `/restaurants/${queryArg.restaurantId}/reviews`,
                params: { _page: queryArg._page, _limit: queryArg._limit },
            }),
        }),
        postReview: build.mutation<PostReviewApiResponse, PostReviewApiArg>({
            query: (queryArg) => ({
                url: `/restaurants/${queryArg.restaurantId}/reviews`,
                method: 'POST',
                body: queryArg.reviewBase,
            }),
        }),
        getReviews: build.query<GetReviewsApiResponse, GetReviewsApiArg>({
            query: (queryArg) => ({
                url: `/reviews`,
                params: {
                    _page: queryArg._page,
                    _limit: queryArg._limit,
                    filter: queryArg.filter,
                    sort: queryArg.sort,
                },
            }),
        }),
        updateReview: build.mutation<
            UpdateReviewApiResponse,
            UpdateReviewApiArg
        >({
            query: (queryArg) => ({
                url: `/reviews/${queryArg.reviewId}`,
                method: 'PUT',
                body: queryArg.review,
            }),
        }),
        deleteReview: build.mutation<
            DeleteReviewApiResponse,
            DeleteReviewApiArg
        >({
            query: (queryArg) => ({
                url: `/reviews/${queryArg.reviewId}`,
                method: 'DELETE',
            }),
        }),
        postReply: build.mutation<PostReplyApiResponse, PostReplyApiArg>({
            query: (queryArg) => ({
                url: `/reviews/${queryArg.reviewId}/reply`,
                method: 'POST',
                body: queryArg.reply,
            }),
        }),
    }),
});
export type LoginApiResponse = /** status 200 successful operation */ UserAuth;
export type LoginApiArg = {
    /** A JSON object containing user credentials */
    userCredentials: UserCredentials;
};
export type LogoutApiResponse = unknown;
export type LogoutApiArg = {};
export type SignUpApiResponse = /** status 201 Created */ UserAuth;
export type SignUpApiArg = {
    /** A JSON object containing user credentials */
    userSignUpCredentials: UserSignUpCredentials;
};
export type GetUsersApiResponse =
    /** status 200 The list of Users and pagination properties. */ {
        users?: User[];
        pagination?: Pagination;
    };
export type GetUsersApiArg = {
    /** The page index to return. */
    _page?: number;
    /** The number of records to return in paginated response. */
    _limit?: number;
    filter?: any;
    /** Field on which to sort, prefixed with '-' to indicate descending order */
    sort?: string;
};
export type PostUserApiResponse = /** status 201 Created */ UserAuth;
export type PostUserApiArg = {
    /** A JSON object containing user credentials */
    userSignUpCredentials: UserSignUpCredentials;
};
export type UpdateUserApiResponse = /** status 200 Updated */ undefined;
export type UpdateUserApiArg = {
    /** The ID of the user. */
    userId: number;
    /** A JSON object containing the User */
    user: User;
};
export type DeleteUserApiResponse = /** status 200 Deleted */ undefined;
export type DeleteUserApiArg = {
    /** The ID of the user. */
    userId: number;
};
export type LoginUserApiResponse =
    /** status 200 successful operation */ UserAuth;
export type LoginUserApiArg = {
    /** A JSON object containing user credentials */
    userCredentials: UserCredentials;
};
export type LogoutUserApiResponse = unknown;
export type LogoutUserApiArg = {};
export type GetRestaurantsApiResponse =
    /** status 200 The list of restaurants and pagination properties. */ {
        restaurants?: Restaurant[];
        pagination?: Pagination;
    };
export type GetRestaurantsApiArg = {
    /** Filter applied to average rating of restaurants. Only restaurants with an average rating >= to minRating are returned. */
    minRating?: number;
    /** The page index to return. */
    _page?: number;
    /** The number of records to return in paginated response. */
    _limit?: number;
    filter?: any;
    /** Field on which to sort, prefixed with '-' to indicate descending order */
    sort?: string;
};
export type PostRestaurantApiResponse = /** status 201 Created */ undefined;
export type PostRestaurantApiArg = {
    /** A JSON object containing the new restaurant */
    restaurantNew: RestaurantNew;
};
export type GetRestaurantByIdApiResponse =
    /** status 200 The restaurant with matching id. */ {
        restaurant: Restaurant;
        highestReview?: Review;
        lowestReview?: Review;
    };
export type GetRestaurantByIdApiArg = {
    /** The ID of the restaurant to return. */
    restaurantId: number;
};
export type UpdateRestaurantApiResponse = /** status 200 Updated */ undefined;
export type UpdateRestaurantApiArg = {
    /** The ID of the restaurant. */
    restaurantId: number;
    /** A JSON object containing the new restaurant */
    restaurantBase: RestaurantBase;
};
export type DeleteRestaurantApiResponse = /** status 200 Deleted */ undefined;
export type DeleteRestaurantApiArg = {
    /** The ID of the restaurant. */
    restaurantId: number;
};
export type GetRestaurantPendingReviewsApiResponse =
    /** status 200 Paginated reviews pending a reply from the owner. */ {
        reviews: Review[];
        pagination?: Pagination;
    };
export type GetRestaurantPendingReviewsApiArg = {
    /** The ID of the restaurant. */
    restaurantId: number;
    /** The page index to return. */
    _page?: number;
    /** The number of records to return in paginated response. */
    _limit?: number;
};
export type GetRestaurantReviewsApiResponse =
    /** status 200 Paginated reviews. */ {
        reviews: Review[];
        pagination?: Pagination;
    };
export type GetRestaurantReviewsApiArg = {
    /** The ID of the restaurant. */
    restaurantId: number;
    /** The page index to return. */
    _page?: number;
    /** The number of records to return in paginated response. */
    _limit?: number;
};
export type PostReviewApiResponse = /** status 201 Created */ undefined;
export type PostReviewApiArg = {
    /** The ID of the restaurant. */
    restaurantId: number;
    /** A JSON object containing user review */
    reviewBase: ReviewBase;
};
export type GetReviewsApiResponse =
    /** status 200 The list of Reviews and pagination properties. */ {
        reviews?: Review[];
        pagination?: Pagination;
    };
export type GetReviewsApiArg = {
    /** The page index to return. */
    _page?: number;
    /** The number of records to return in paginated response. */
    _limit?: number;
    filter?: any;
    /** Field on which to sort, prefixed with '-' to indicate descending order */
    sort?: string;
};
export type UpdateReviewApiResponse = /** status 200 Updated */ undefined;
export type UpdateReviewApiArg = {
    /** The ID of the review. */
    reviewId: number;
    /** A JSON object containing the Review */
    review: Review;
};
export type DeleteReviewApiResponse = /** status 200 Deleted */ undefined;
export type DeleteReviewApiArg = {
    /** The ID of the review. */
    reviewId: number;
};
export type PostReplyApiResponse = /** status 201 Created */ undefined;
export type PostReplyApiArg = {
    /** The ID of the review. */
    reviewId: number;
    /** A JSON object containing owner reply */
    reply: Reply;
};
export type User = {
    name: string;
    email: string;
    id: number;
    role: 'User' | 'Owner' | 'Admin';
};
export type UserAuth = {
    user: User;
    token: string;
};
export type Error = {
    code: string;
    message: string;
};
export type UserCredentials = {
    name: string;
    password: string;
};
export type UserSignUpCredentials = {
    email: string;
} & UserCredentials;
export type Pagination = {
    total_count: number;
};
export type RestaurantBase = {
    name: string;
    ownerId: number;
};
export type Restaurant = RestaurantBase & {
    id: number;
    avg_rating?: number;
    pendingReplies?: number;
};
export type RestaurantNew = {
    name: string;
};
export type ReviewBase = {
    rating: number;
    comment: string;
};
export type Review = {
    id: number;
    date: string;
    reply?: string;
} & ReviewBase;
export type Reply = {
    reply: string;
};
export const {
    useLoginMutation,
    useLogoutQuery,
    useSignUpMutation,
    useGetUsersQuery,
    usePostUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useLoginUserMutation,
    useLogoutUserQuery,
    useGetRestaurantsQuery,
    usePostRestaurantMutation,
    useGetRestaurantByIdQuery,
    useUpdateRestaurantMutation,
    useDeleteRestaurantMutation,
    useGetRestaurantPendingReviewsQuery,
    useGetRestaurantReviewsQuery,
    usePostReviewMutation,
    useGetReviewsQuery,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    usePostReplyMutation,
} = api;
