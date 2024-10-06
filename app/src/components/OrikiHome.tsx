"use client";
import React from 'react';
import { Box, Container, Typography } from '@mui/material';

// TypingText component to display the typing animation
const TypingText = () => {
  const fullText = "Oriki Ile Yoruba";
  const [displayedText, setDisplayedText] = React.useState("");

  React.useEffect(() => {
    let index = 0;

    const type = () => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
        setTimeout(type, 100); // Adjust typing speed (100ms between each character)
        }
    };

    type(); // Start the typing effect

    // Cleanup function to prevent memory leaks
    return () => {
      index = fullText.length; // Prevent updates if the component unmounts
    };
  }, [fullText]);

  return (
    <Typography variant="h4" gutterBottom>
      {displayedText}
    </Typography>
  );
};

const OrikiHome = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, // Stack content on small screens
        minHeight: '100vh', 
        alignItems: 'center', // Center content vertically
        justifyContent: 'center', // Center content horizontally
        padding: 2, 
        textAlign: { xs: 'center', md: 'center' }, // Center text on both small and large screens
        mx: { xs: 2, md: 'auto' }, // Add horizontal margin to center content on large screens
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          animation: 'fadeIn 2s forwards', // Fade-in animation for the container
          '@keyframes fadeIn': {
            '0%': { opacity: 0 }, // Start fully transparent
            '100%': { opacity: 1 }, // End fully visible
          },
        }}
      >
        {/* Typing text for the welcome message */}
        <TypingText />
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Oriki Ile Yoruba celebrates the beauty and richness of Yoruba heritage through poetry and praise. Our mission is to preserve and share these cherished traditions.
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Join us in exploring the depths of Yoruba culture and connecting with our roots.
        </Typography>
      </Container>

      {/* Image on the right-hand side for larger screens, stacked below on mobile */}
      <Box 
        component="img" 
        src="https://upload.wikimedia.org/wikipedia/commons/1/13/Yoruba_cultural_symbol.jpg"
        alt="Yoruba Cultural Symbol"
        sx={{
          maxWidth: { xs: '80%', md: '300px' }, // 80% on small screens, 300px on medium and up
          height: 'auto',
          marginTop: { xs: 3, md: 0 }, // Top margin on small screens
          marginLeft: { xs: 0, md: 4 }, // No left margin on small screens, add space on medium and up
          animation: 'fadeIn 2s forwards', // Fade-in animation for the image
          '@keyframes fadeIn': {
            '0%': { opacity: 0 }, // Start fully transparent
            '100%': { opacity: 1 }, // End fully visible
          },
        }}
      />
    </Box>
  );
};

export default OrikiHome;