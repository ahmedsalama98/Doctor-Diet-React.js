import { Container, Grid } from '@mui/material';
import React from 'react'




export default function Home() {

    return (
      <>
       
        <Container >
        <Grid container spacing={1}>
        
            <Grid item xs={12} lg={4} sx={{ background:'red' }}>

              grid
            </Grid>

              <Grid item lg={4}>

              grid
            </Grid>
            <Grid item lg={4}>

              grid
          </Grid>
          


        </Grid>
        </Container>
        
           

      </>
    
  )
}
