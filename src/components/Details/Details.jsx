import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Details() {
   //alias HOOKS
  const dispatch = useDispatch();
  const history = useHistory();

   //global REDUCER that holds Detail ID
  const detailID = useSelector((store) => store.idDetailReducer);
  const movieDetails = useSelector((store) => store.movieDetailReducer);

  useEffect(() => {
    dispatch({
      type: 'FETCH_DETAIL',
      payload: detailID
    });
  }, []);



  return (
    <div>
      <p>It's the Details page!</p>
    </div>
  )
};