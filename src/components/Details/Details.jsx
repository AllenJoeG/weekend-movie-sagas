import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Details.css'

//MUI STUFF
import {Box, Grid, Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';

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
    <Box>
      <Grid container>
        <Grid item xs={1} sm={2} md={3}></Grid>
          <Grid item xs={10} sm={8} md={6}>
            <Card className="card" elevation="12">
              <CardHeader
                component="h4"
                className="cardHeader"
              />
                {movieDetails.map((movie) => {
                  return(<CardMedia component="img" src={movie.poster}/>)
                })}
              <CardContent
                bgcolor="secondary.light"
                
              >
                {genreDetails.map((genre) => {
                  return <p>{genre}</p>
                })}
                {movieDetails.map((movie) => {
                  return(<Typography>{movie.description}</Typography>)
                })}
              </CardContent>
                
            </Card>
          </Grid>
        
        
        
        
        

        <Grid item xs={1} sm={2} md={3}></Grid>
      </Grid>

    </Box>
  )
};

// {movieDetails.map((movie) => {
//   return(<div><img src={movie.poster}/> <p>{movie.description}</p></div>)
// })}
