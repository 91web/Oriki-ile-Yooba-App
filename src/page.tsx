"use client";

import * as React from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import { useCountUp } from 'use-count-up';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation'; // For navigation
import Logo from './public/assets/yoruba.png'; // Importing the image

export default function LinearProgressCountUp() {
  const router = useRouter(); // Initialize router

  const { value } = useCountUp({
    isCounting: true,
    duration: 2,
    easing: 'linear',
    start: 0,
    end: 90,
    onComplete: () => {
      // After completion (when progress reaches 100%)
      setTimeout(() => {
        router.push('/web'); // Redirect to the next page
      }, 200); // Delay for effect
      return { shouldRepeat: false }; // Stop repeating
    },
  });

  const [typedText, setTypedText] = React.useState('');
  const orikiText = 'OOriki Ile Yoruba                                                          ..................................................................'; 

  React.useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      // Ensure that we only update the text if the index is within range
      if (index < orikiText.length) {
        setTypedText((prev) => prev + orikiText[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 90); // Adjust typing speed as needed
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      {/* Image above the loader */}
      <Box 
  sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: '20px' 
  }}
>
  <img
    src={Logo.src} // Using the imported image
    alt="Oriki Image"
    style={{ width: '100px', borderRadius: '20px' }} // Adjust as needed
  />
</Box>

      {/* Typing effect for Oriki Ile Yoruba */}
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        {typedText}
      </Typography>

      {/* Linear Progress Bar */}
      <LinearProgress
        determinate
        variant="outlined"
        color="neutral"
        size="sm"
        thickness={24}
        value={Number(value!)}
        sx={{
          '--LinearProgress-radius': '20px',
          '--LinearProgress-thickness': '24px',
          width: '300px',
          margin: '0 auto',
        }}
      >
        <Typography
          level="body-xs"
          textColor="common.white"
          sx={{ fontWeight: 'xl', mixBlendMode: 'difference' }}
        >
          LOADING… {`${Math.round(Number(value!))}%`}
        </Typography>
      </LinearProgress>
    </Box>
  );
}
