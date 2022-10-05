import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeveIcon from '@mui/icons-material/DeleteForever';
import operations, {loadData} from "../services/services";

// import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import { height } from '@mui/system';
import { Button, Grid } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



export default function CardItem({item, user, currentState, setCurrentState}){
   
    const [expanded, setExpanded] =  React.useState(false);
    const router =  useRouter()

    const callLink = (link) =>{
      router.push(link)
    }
    
    const handleRemove = (key) => {
      const newPeople = currentState.filter((item) => item.key !== key);
      setCurrentState(newPeople)
    };
    
    const delete_card = (user, key) => {
      if (window.confirm("Delete the item?")) {
        operations.delete(user, key)
        handleRemove(key)
      }
    }

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (  
      <Card sx={{ maxWidth: 345 }}>
         <CardActions disableSpacing>
          <IconButton aria-label="Edit" onClick={() => callLink("/teste11/adm/create?card_id="+item.key)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete" onClick={() => delete_card(user.displayName, item.key)}>
            <DeleteForeveIcon />
          </IconButton>
        </CardActions>
        <CardMedia height={300} component="img" image={item.img} onClick = {() => {handleOpen({...item})}}/>
        <CardContent>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item md={10}  >
            <Typography variant="h6" color="text.secondary">
          {item.title}
          </Typography>
            </Grid>
            <Grid item md={2}  >
            <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
            </Grid>
          </Grid>
          
        </CardContent>
    
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {item.body}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
}