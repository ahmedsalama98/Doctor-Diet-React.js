import { Container, Paper } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
     
      <Paper sx={{ bgcolor: 'common.black',py:'10px',borderRadius:0 ,color:'common.white' ,textAlign:'center'}}>
           <Container maxWidth='md'>
          
              &copy; 2022
          </Container>
      </Paper>
  )
}
