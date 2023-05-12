import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';



export default function ButtonAppBar() {
const navigate =  useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style = {{backgroundColor:'#0A174E'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>navigate('/')} style={{color:'#ACC7B4'}}>
            CALORIE CALCULATOR
          </Typography>
          <Button color="inherit" onClick={()=>navigate('/calorie-management')} style={{color:'#ACC7B4'}}>ADD NEW <AddIcon/></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}