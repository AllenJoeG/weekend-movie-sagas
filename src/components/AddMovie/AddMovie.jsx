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
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <TextField
                required
                fullWidth
                color="secondary"
                variant="filled"
                type='text'
                label='Movie Title' 
                value={movieTitle} 
                onChange={e => setMovieTitle(e.target.value)}
                helperText="What is the Name of the Film?"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <TextField
                required
                fullWidth
                color="secondary"
                variant="filled"
                type='text'
                label='Poster URL' 
                value={moviePoster} 
                onChange={e => setMoviePoster(e.target.value)}
                helperText="Please Provide a URL for Poster"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <TextField
                required
                fullWidth
                multiline
                color="secondary"
                variant="filled"
                type='text'
                label='Movie Summary' 
                value={movieSummary} 
                onChange={e => setMovieSummary(e.target.value)}
                helperText="Please Describe the Film"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <TextField
              select
              required
              fullWidth
              color="secondary"
              variant="filled"
              formlabel="Select a Genre"
              value={movieGenre}
              onChange={handleGenre}
              name="genres" 
              id="movieGenres"
              label="Genre"
              helperText="Please Select a Genre"
            >
              {/* Map through dbrow category result. Need Saga/Reducer */}
              {genres.map((genre, i) => {
                return <MenuItem key={i} value={genre.id}>{genre.name}</MenuItem>
              })}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Button variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Button variant="contained" color="secondary" type="submit">Save Movie</Button>
          </Grid>
        </Grid>
      </form>
      
    </Box>
  )
}