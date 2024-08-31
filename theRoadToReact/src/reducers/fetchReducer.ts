export type FetchData = {
    objectID: string;
    url: string;
    title: string;
    author: string;
    num_comments: number;
    points: number;
};

type StoriesState = {
    data: FetchData[];
    isLoading: boolean;
    isError: boolean;
}

type StoriesFetchInitAction = {
    type: 'STORIES_FETCH_INIT';
};
type StoriesFetchSuccessAction = {
    type: 'STORIES_FETCH_SUCCESS';
    payload: FetchData[];
};
type StoriesFetchFailureAction = {
    type: 'STORIES_FETCH_FAILURE';
};
type StoriesRemoveAction = {
    type: 'REMOVE_STORY';
    payload: FetchData;
};

type StoriesAction = 
    | StoriesFetchInitAction
    | StoriesFetchSuccessAction
    | StoriesFetchFailureAction
    | StoriesRemoveAction;

export const storiesReducer = (state: StoriesState, action: StoriesAction) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'STORIES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter((story) => action.payload.objectID !== story.objectID),
            };
        default:
            throw new Error();
    }
};