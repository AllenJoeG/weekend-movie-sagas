import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Details() {
   //alias HOOKS
  const dispatch = useDispatch();

   //global REDUCER that holds Detail ID
  const detailID = useSelector((store) => store.idDetailReducer);
  const movieDetails = useSelector((store) => store.movieDetailReducer);
  const genreDetails = useSelector((store) => store.genreDetailReducer);

  useEffect(() => {
    dispatch({
      type: 'FETCH_DETAIL',
      payload: detailID
    });
  }, []);

  return (
    <div>
      <ul>
      {genreDetails.map((genre) => {
        return <li>{genre}</li>
      })}
      </ul>
      
      {movieDetails.map((movie) => {
        return(<div><img src={movie.poster}/> <p>{movie.description}</p></div>)
      })}

    </div>
  )
};