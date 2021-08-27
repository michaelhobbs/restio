import { api as generatedApi } from './api.generated';

export const api = generatedApi.enhanceEndpoints({
    addTagTypes: ['Restaurants'],
    endpoints: {
        // basic notation: just specify properties to be overridden
        getRestaurants: {
            providesTags: ['Restaurants'],
        },
        postRestaurant: {
            invalidatesTags: ['Restaurants'],
        },
    },
});

export * from './api.generated';

export const { useGetRestaurantsQuery, usePostRestaurantMutation } = api;
