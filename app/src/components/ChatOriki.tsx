
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
} from '@mui/material';

const orikiList = [
  'Oriki Iya: Iya ni wura, Iya ni to ga ju.',
  'Oriki Baba: Baba nla ni, Baba mi, A ti wa wa.',
  'Oriki Ijeun: Ijeun ni iwa, Iwa ni jeun.',
  'Oriki Omo: Omo ti a bi ni, Omo ti o ni igba.',
  'Oriki Iya Afin: Iya afin ni, Iya ti a kose.',
  'Oriki Oodua: Oodua lo wa, Oodua ni ogo.',
  'Oriki Oba: Oba ti o to, Oba ti o ni ise.',
  'Oriki Olokun: Olokun, Olokun, ti o ni ina.',
  'Oriki Osun: Osun ti o dara, Osun ti o mu wa.',
  'Oriki Eja: Eja to mo, Eja ti o ni oke.',
  'Oriki Ewe: Ewe ti o sun, Ewe ti o ni adun.',
  'Oriki Ẹyẹ: Ẹyẹ to gbo, Ẹyẹ ti o sọrọ.',
  'Oriki Ayo: Ayo ni iwa, Ayo ni igbesi.',
  'Oriki Iwapele: Iwapele ni, Iwapele ti o da.',
  'Oriki Ase: Ase lo wa, Ase ni agbara.',
  'Oriki Iwe: Iwe ti o ni, Iwe ti o da.',
  'Oriki Ilẹ Yoruba: Ilẹ Yoruba ni, Ilẹ ti o ni irun.',
  'Oriki Ogun: Ogun lo wa, Ogun ni agbara.',
  'Oriki Ekun: Ekun ni itiju, Ekun ni abojuto.',
  'Oriki Omo Naija: Omo Naija ni, Omo ti o ni anfani.'
];

const ChatForm = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  React.useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'yo-NG';
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleSendMessage(transcript); // Automatically send the recognized input
      };
      setRecognition(recognitionInstance);
    }
  }, []);

  const handleSendMessage = (input: string) => {
    if (!input) return;
    const response = orikiList[Math.floor(Math.random() * orikiList.length)];
    setMessages([...messages, { text: input, sender: 'user' }, { text: response, sender: 'system' }]);
    setUserInput('');
    speak(response);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'yo-NG'; // Set language to Yoruba
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <AppBar position="static" sx={{ marginBottom: '16px' }}>
        <Toolbar>
          <Typography variant="h6">Oriki Chat</Typography>
        </Toolbar>
      </AppBar>
      <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
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
      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(userInput);
          }
        }}
      />
      <Button
        variant="contained"
        onClick={() => handleSendMessage(userInput)}
        sx={{ marginTop: '8px' }}
      >
        Send
      </Button>
      <Button
        variant="outlined"
        onClick={startVoiceRecognition}
        sx={{ marginTop: '8px', marginLeft: '8px' }}
      >
        🎤 Speak
      </Button>
    </Box>
  );
};

export default ChatForm;