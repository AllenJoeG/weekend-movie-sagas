import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

//MUI stuff
import { Box, Grid, TextField, Button, MenuItem } from '@mui/material';

export default function AddMovie() {
  //alias HOOKS
  const dispatch = useDispatch();
  const history = useHistory();

  //global REDUCER that holds Movie Categories
  const genres = useSelector((store) => store.genresReducer)

  //local state for managing inputs
  const [movieTitle, setMovieTitle] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movieSummary, setMovieSummary] = useState('');
  const [movieGenre, setMovieGenre] = useState('');
  
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  //Function to handle AddMovie
  //Dispatches to SAGA that POSTS to server for query add to DB
  const handleAddMovie = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_MOVIE',
      payload: {
        title: movieTitle,
        poster: moviePoster,
        description: movieSummary,
        genre_id: movieGenre
      }
    })
  }

  //Function handles Genre selection
  const handleGenre = (e) => {
    console.log(e.target.value);
    setMovieGenre(e.target.value);
  }

  //Function handles nav back to main view
  const handleCancel = () => {
    history.push('/')
  }

  return(
    <Box
      height={800}
    >
      <form onSubmit={handleAddMovie}>
        <Grid container spacing={2}>        
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField
                required
                color="secondary"
                variant="filled"
                type='text'
                label='Movie Title' 
                value={movieTitle} 
                onChange={e => setMovieTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField
                required
                color="secondary"
                variant="filled"
                type='text'
                label='Poster URL' 
                value={moviePoster} 
                onChange={e => setMoviePoster(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField
                required
                multiline
                color="secondary"
                variant="filled"
                type='text'
                label='Movie Summary' 
                value={movieSummary} 
                onChange={e => setMovieSummary(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField
              select
              required
              color="secondary"
              variant="filled"
              formLabel="Select a Genre"
              onChange={handleGenre}
              name="genres" 
              id="movieGenres"
              label="Genre"
              helperText="Please Select a Genre"
            >
              {/* Map through dbrow category result. Need Saga/Reducer */}
              {genres.map((genre) => {
                return <MenuItem value={genre.id}>{genre.name}</MenuItem>
              })}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={12} lg={12}>
            <Button variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
          
            <Button variant="contained" color="secondary" type="submit">Save</Button>
          </Grid>
        </Grid>
      </form>
      
    </Box>
  )
}