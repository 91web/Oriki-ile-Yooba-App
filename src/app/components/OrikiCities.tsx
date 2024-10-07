import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box } from '@mui/material';
import Cities from './staticData'; // Make sure this path is correct

export default function YorubaCitiesComponent() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, my: 10 }}> {/* Use Box for regular pattern and spacing */}
      {Cities.map((city) => (
        <Box key={city.id} sx={{ flex: '0 0 auto' }}> {/* Prevent flex item from growing */}
          <Card sx={{ maxWidth: 305, height: '100%', display: 'flex', flexDirection: 'column' }}> {/* Flex to stack children */}
            <CardActionArea sx={{ flexGrow: 1 }}> {/* Allow the CardActionArea to grow */}
              <CardMedia
                component="img"
                height="140"
                image={city.image}
                alt={city.name}
              />
              <CardContent sx={{ flexGrow: 1 }}> {/* Allow the CardContent to grow */}
                <Typography gutterBottom variant="h5" component="div">
                  {city.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {city.description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  Location: {city.location}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </Box>
  );
}