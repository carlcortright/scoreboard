import { useState } from 'react';
import { useGoogleSheet } from './useGoogleSheet';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import './App.css';

function App() {
  const [points, setPoints] = useState('');
  const [activity, setActivity] = useState('');
  const [data, updateData] = useGoogleSheet();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(points, activity);
    setPoints('');
    setActivity('');
  };

  return (
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Google Sheets React App
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
              type="number"
              label="Points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              fullWidth
              margin="normal"
          />
          <TextField
              type="text"
              label="Activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              fullWidth
              margin="normal"
          />
          <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
          >
            Add
          </Button>
        </form>
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Points</TableCell>
                <TableCell>Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(1).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
  );
}

export default App;