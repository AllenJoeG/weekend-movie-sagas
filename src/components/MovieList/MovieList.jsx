import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

//MUI
import { Box, Grid, Card, CardHeader, CardMedia, CardActionArea,} from '@mui/material'

function MovieList() {
  //alias HOOKS
  const history = useHistory();
  const dispatch = useDispatch();
  //Global REDUCERS
  const movies = useSelector(store => store.movies);
  

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  const handlePosterClick = (id) => {
    //capture id and dispatch to idDetailReducer
    dispatch({
      type: 'STORE_DETAIL_ID',
      payload: id
    });

    //navigate to Details view
    history.push(`/details`)
  }

  return (
    <Box 
      padding="4%"
    >
      <Grid 
        container
        direction="row"
        justify-content="space-around"
        align-items="center"
        spacing={8}
        elevation={12}
        className="movies"
      >
        {movies.map(movie => {
          return (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="card">
                <CardActionArea onClick={e => handlePosterClick(movie.id)}>
                  <CardHeader 
                    component="h4"
                    className="cardHeader"
                    // title={movie.title}
                  />
                  <CardMedia
                    
                    component="img"
                    width="200"
                    src={movie.poster}
                    alt={movie.title}          
                  />
                  
                </CardActionArea>
              </Card>
              
            </Grid>
          );
        })}
      </Grid>
    </Box>

  );
}

export default MovieList;