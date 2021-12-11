import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

//MUI
import { Box, Grid, Card, CardHeader, CardMedia, CardActionArea, createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      light: '#482880',
      main: '#673ab7',
      dark: '#8561c5',
      contrastText: '#fff',
    },
    secondary: {
      light: '#598e89',
      main: '#80cbc4',
      dark: '#99d5cf',
      contrastText: '#000',
    },
  },
});

function MovieList() {

  const history = useHistory();
  const dispatch = useDispatch();
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
              <Card>
                <CardActionArea onClick={e => handlePosterClick(movie.id)}>
                  <CardHeader 
                    sx={{"background-color": "gray", "color": "white"}}
                    component="h4" 
                    title={movie.title}
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