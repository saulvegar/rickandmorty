import { Badge, Box, Card, CardContent, CardMedia, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;

    if (selectedCharacters.find(c => c.id === value.id)) {
      return;
    }

    setSelectedCharacters([...selectedCharacters, value]);
  }

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character', {
      params: {
        count: 20,
        page: 1,
      },
    }).then((json) => json.data)
      .then(data => setCharacters(data.results))
  }, []);


  return (
    <Box sx={{ flexGrow: 1 }} padding={10}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Personaje</InputLabel>
        <Select
          labelId="characters"
          id="characters"
          label="Selecciona un personaje"
          onChange={handleChange}
        >
          {
            characters.map((character) => (<MenuItem value={character}>{ character.name }</MenuItem>))
          }
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {
          selectedCharacters.map(({ id, name, image, status, species, gender }) => (
            <Grid item key={id} xs={12} sm={3} md={3}>
              <Card sx={{ maxWidth: 345, display: 'flex' }}>
                <CardMedia
                  component="img"
                  alt={name}
                  sx={{ width: 151 }}
                  image={image}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography gutterBottom variant="h5" component='div'>
                      { name }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Badge color={status === 'Alive' ? 'success' : 'error'} variant="dot" className='badge' />
                      <span>{ status }</span>
                      <span>{ species }</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Genero: { gender }
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}

export default App;
