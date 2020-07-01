import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

//fetchPostsAndUsers refactored with chain:
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    _.chain(getState().posts)
      .map('userId')
        .uniq()
          .forEach(id => dispatch(fetchUser(id)))
            .value();
};

//fetchPostsAndUsers (old version):
// export const fetchPostsAndUsers = () => async (dispatch, getState) => {
//     await dispatch(fetchPosts());
    
//     const userIds = _.uniq(_.map(getState().posts, 'userId'));

//     userIds.forEach(id => dispatch(fetchUser(id)));
// };

export const fetchPosts =  () =>  async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({ type: 'FETCH_POSTS', payload: response.data })
};

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data})
};

// Using memoization and lodash:
// export const fetchUser = (id) => (dispatch) => {
//     _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data})
// });