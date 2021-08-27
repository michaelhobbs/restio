import { api as generatedApi } from './api.generated';

export const api = generatedApi.enhanceEndpoints({
    addTagTypes: ['Restaurants', 'Reviews'],
    endpoints: {
        // basic notation: just specify properties to be overridden
        getRestaurants: {
            providesTags: ['Restaurants'],
        },
        postRestaurant: {
            invalidatesTags: ['Restaurants'],
        },
        postReview: {
            invalidatesTags: ['Reviews'],
        },
        getReviews: {
            providesTags: ['Reviews'],
        },
        postReply: {
            invalidatesTags: ['Reviews'],
        },
        getRestaurantReviews: {
            providesTags: ['Reviews'],
        },
    },
});

export * from './api.generated';

export const {
    useGetRestaurantsQuery,
    usePostRestaurantMutation,
    usePostReviewMutation,
    useGetReviewsQuery,
    usePostReplyMutation,
    useGetRestaurantReviewsQuery,
} = api;
