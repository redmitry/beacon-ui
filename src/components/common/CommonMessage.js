import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function CommonMessage({ text, type }) {
  const severity = type === 'error' ? 'error' : 'success';
 
  return (
    <Stack 
      sx={{ 
        width: '100%', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} 
      spacing={2}>
      <Alert severity={severity} sx={{ width: '80%', justifyContent: 'center',  alignItems: 'center' }}>{text}</Alert>
    </Stack>
  );
}