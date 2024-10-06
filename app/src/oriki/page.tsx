"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Container
} from '@mui/material';
import { Oriki, OrikiIleYoruba } from '../components/staticData';  // Correct import statement
import Link

from 'next/link';
const ChatForm = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedOriki, setSelectedOriki] = useState<string | null>(null);

  const townList = OrikiIleYoruba.map((oriki, index) => `${index + 1}. ${oriki.town}`).join("\n");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'yo-NG'; // Yoruba
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleTownSelection(transcript);
      };
      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      const femaleYorubaVoice = voices.find(voice => voice.lang === 'yo-NG');
      setVoice(femaleYorubaVoice || voices[0]);
    };

    speechSynthesis.onvoiceschanged = handleVoicesChanged;
  }, []);

  const handleTownSelection = (input: string) => {
    const selectedIndex = parseInt(input) - 1;

    const selectedOriki = OrikiIleYoruba[selectedIndex]
      ? OrikiIleYoruba[selectedIndex]
      : OrikiIleYoruba.find(oriki => oriki.town.toLowerCase() === input.toLowerCase());

    if (selectedOriki) {
      const response = selectedOriki.oriki;

      setIsTyping(true);
      setSelectedOriki(null);

      let displayText = "";
      const chars = response.split("");
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < chars.length) {
          displayText += chars[currentIndex];
          currentIndex++;
          setSelectedOriki(displayText);
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          speak(response);
        }
      }, 100); // Delay for typing animation

      setMessages([...messages, { text: input, sender: 'user' }]);
      setUserInput('');
    } else {
      setMessages([...messages, { text: `No Oriki found for "${input}"`, sender: 'system' }]);
    }
  };

  const speak = (text: string) => {
    if (voice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startVoiceRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ padding: 2 }}>
      {!selectedOriki ? (
        <Paper elevation={3} sx={{ padding: 4, backgroundColor: 'white', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Oriki Ile Wa
          </Typography>
          <List sx={{ maxHeight: { xs: '300px', sm: '400px' }, overflowY: 'auto', marginBottom: 2 }}>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={msg.text}
                  secondary={msg.sender === 'user' ? 'You' : 'System'}
                  sx={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}
                />
              </ListItem>
            ))}
          </List>
          {isTyping && <Typography variant="h6" align="left">System is typing...</Typography>}
          <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
            Select a town by number or name (voice or text):
          </Typography>
          <pre>{townList}</pre>
          <TextField
            label="Type your town number or name"
            variant="outlined"
            fullWidth
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                handleTownSelection(userInput);
              }
            }}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: 1 }}>
            <Button variant="outlined" onClick={() => handleTownSelection(userInput)} sx={{ flexGrow: 1 }}>
              Send
            </Button>
            <Button variant="outlined" onClick={startVoiceRecognition} sx={{ flexGrow: 1 }}>
              🎤 Speak
            </Button>
          </Box>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
          <Typography variant="h4" sx={{ marginTop: 2, fontWeight: 'bold' }}>
            {selectedOriki}
          </Typography>
          <Link href="/" passHref>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedOriki(null);
              setMessages([]);
              setUserInput('');
            }}
            sx={{ marginTop: 3 }}
          >
            Back
          </Button>
          </Link>

          


        </Box>
      )}
    </Container>
  );
};

export default ChatForm;