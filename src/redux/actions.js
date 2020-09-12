import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './types';
import axios from 'axios';
import { PEOPLE, PLANETS } from './dataTypes';
import { API_PEOPLE, API_PLANETS, API_STARSHIPS } from './endpoints';

export const fetchDataRequest = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}

export const fetchDataSuccess = data => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
}

export const fetchDataFailure = error => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
}

export const fetchData = (dataType,searchTerm="") => {
    return function(dispatch) {
        const url = dataType === PEOPLE ? API_PEOPLE
                    : dataType === PLANETS ? API_PLANETS
                    : API_STARSHIPS
        dispatch(fetchDataRequest())
        axios.get(`${url}?search=${searchTerm}`)
            .then(res => {
                dispatch(fetchDataSuccess(res.data.results))
            })
            .catch(err => {
                dispatch(fetchDataFailure(err.message))
            })
    }
}