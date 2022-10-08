import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardItem from './CardItem.tsx';
import { useState, useEffect, forwardRef } from "react";
import { Router, useRouter } from "next/router";
import * as ReactDOM from 'react-dom';
import CardDataService from "../services/services2";
import { ReactSortable } from "react-sortablejs";
import { id } from 'date-fns/locale';

function CardsGrid(props){
   
  const [state, setState] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const router = useRouter()
    
    const Item = ({ item, user, currentState, setCurrentState}) => (
      <div className="text-white flex justify-center items-center h-16 w-40 rounded border m-4 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
        <Grid item xs={12} sm={4} md={3} key={item.key}  >
          <Box style={{"padding": "0px"}}>
            <CardItem user={user} item={item} currentState={currentState} setCurrentState={setCurrentState}/>
          </Box>
        </Grid>
      </div>
    );
    const CustomComponent = forwardRef((props, ref) => {
      return <div ref={ref}>{props.children}</div>;
    });
    // Drag and Drop Handler
    const onDragDropEnds = (oldIndex, newIndex) => {
      console.log('Drag and drop other tasks');
      console.log(oldIndex, newIndex);
      console.log(props.currentState)
      // operations.save(props.user.displayName, props.currentState)
      let a = []
      let obj3 = {}
      let ids_ = []
      let reg = []
      props.currentState.map((item, index) => {
        // a.push({[item.key]: {...item}})
        // obj3[item.key] = {...item, order: index}
        // ids_.push({...item, order: index})
        reg.push({key: item.id, ...item, order: index})
    })
      // a.forEach((element, index) => {
      //   obj3[element.key] = element;
      // });
      reg.map((item, i)=>{
        CardDataService.update(props.user.displayName, item.id, item)
      })
      console.log(props.user.displayName, obj3);
      //operations.save(props.user.displayName, ids_, obj3)
    };
    return (
        <ReactSortable 
            className="grid-container"
            list={props.currentState} 
            setList={(newlist) => props.setCurrentState(newlist)}
            onEnd={({ oldIndex, newIndex }) => onDragDropEnds(oldIndex, newIndex)}
            >
            {props.currentState.map((item) => (
              <CardItem key={item.key} user={props.user} item={item} currentState={props.currentState} setCurrentState={props.setCurrentState}/>
            ))}
        </ReactSortable>
    )
}

export default CardsGrid