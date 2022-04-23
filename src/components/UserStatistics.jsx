
import { Container } from '@material-ui/core';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react'

import { Chart, LineController, LineElement, PointElement, LinearScale, Title,  CategoryScale,
    
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title ,CategoryScale);
export default function UserStatistics() {

    const userCalories = useRef();
    const userWeight = useRef();
    const userCaloriesData =useState({labels :[] , data:[]})
    const userWeightData =useState({labels :[] , data:[]})
    let r =Math.round(Math.random()* 255);
    let g =Math.round(Math.random()* 255);
    let b =Math.round(Math.random()* 255);
    let rgb = `rgb(${r} , ${g} ,${b})`;

    useEffect(()=>{
        const data = {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
            datasets: [
              {
                label: 'Dataset',
                data: [20,40,50,50,40,60],
 
                pointStyle: 'circle',
                pointRadius: 10,
                pointHoverRadius: 15,
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: rgb,
                pointBackgroundColor: rgb,
                pointBorderColor: rgb,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointBorderWidth: 2,
        
              }
            ]
          };
          const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                  title: {
                    display: true,
                    text: 'Chart.js Stacked Line/Bar Chart'
                  }
                },
                animations: {
                    tension: {
                      duration: 1000,
                      easing: 'linear',
                      from: 1,
                      to: 0,
                      loop: true
                    }
                  },
                  scales: {
                    y: { 
                      min: 0,
                      max: 100
                    }
                  },
           
              },
            
          };
        const chart = new Chart(userCalories.current, config )

    },[])
  return (
    <Container>UserStatistics

<Box height={'400px'}>
 
<canvas id='userWeightChart' ref={userCalories} height='100%'></canvas>

</Box>

    </Container>
  )
}
