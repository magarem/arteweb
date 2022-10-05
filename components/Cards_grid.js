import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";
import operations, {loadData} from "../services/services";
import { Router, useRouter } from "next/router";

function cards_list(props){
    const [state, setState] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const router = useRouter()

    const call_link = (link) =>{
      router.push(link)
    }

    const handleRemove = (key) => {
      const newPeople = props.currentState.filter((item) => item.key !== key);
      props.setCurrentState(newPeople)
    };

    const delete_card = (user, key) => {
        if (window.confirm("Delete the item?")) {
          operations.delete(user, key)
          // console.log(currentState);
          handleRemove(key)
          // props.setCurrentState(aa)
          // console.log(currentState);
        }
      }
    
    return (
        <Grid container rowSpacing={2} columnSpacing={2}>
        {

          props.currentState.map((item, key) => (
            // <div style={{ display: "inline-block" , padding: "10px"}}>
              <Grid item xs={12} sm={4} md={3} key={key} >
                <Box  style={{"padding": "0px"}}>
                <Card raised >
                  <CardMedia
                    height={300}
                    component="img"
                    image={item.img}
                    onClick = {() => {handleOpen({...item})}}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                    {item.body}
                    </Typography> */}
                  </CardContent>
                  {/* <CardActions disableSpacing> */}
                  <CardActions>
                    {/* <Link href={"/teste11/adm/create?card_id="+item.key} >Edit</Link> */}
                    <Button size="small" onClick={(e) => call_link("/teste11/adm/create?card_id="+item.key)}>Edit</Button>
                    <Button size="small" onClick={(e) => delete_card(props.user.displayName, item.key)}>Delete</Button>
                  </CardActions>
          {/* <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore> */}
        {/* </CardActions> */}
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
              aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
              large plate and set aside, leaving chicken and chorizo in the pan. Add
              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
              stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and
              peppers, and cook without stirring, until most of the liquid is absorbed,
              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
              mussels, tucking them down into the rice, and cook again without
              stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
                  {/* <CardActions>
                    <Button size="small">Edit</Button>
                    <Button size="small">Delete</Button>
                  </CardActions> */}
                </Card>
              {/* </div> */}
              </Box>
              </Grid>
          ))
        }
        </Grid> 
    )
}

export default cards_list