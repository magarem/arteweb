import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardItem from './CardItem.tsx';
import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";

function CardsGrid(props){
   
  const [state, setState] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const router = useRouter()
    
    return (
        <Grid container rowSpacing={2} columnSpacing={2} >
          {
            props.currentState.map((item, key) => (
                <Grid item xs={12} sm={4} md={3} key={key} >
                  <Box style={{"padding": "0px"}}>
                    <CardItem key={key} user={props.user} item={item} currentState={props.currentState} setCurrentState={props.setCurrentState}/>
                  </Box>
                </Grid>
            ))
          }
        </Grid> 
    )
}

export default CardsGrid