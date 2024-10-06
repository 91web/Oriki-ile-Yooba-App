import React from 'react';
import { Box, Container, Grid2, Typography, Divider } from '@mui/material';

const OrikiFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        padding: '20px 0', // Adjusted padding for better spacing
        marginTop: 'auto', // Push footer to the bottom
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={3} justifyContent="center">
          <Grid2 item xs={12} md={4}>
            <Typography variant="body2" align="center">
              This Application is dedicated to preserving and promoting the rich cultural heritage of Yoruba Oriki.
            </Typography>
            <Divider sx={{ my: 2, bgcolor: 'white' }} />
            <Typography variant="body2" align="center">
              All rights reserved © 2024 Oriki Ile Yoruba Application
            </Typography>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default OrikiFooter;
