
import * as React from 'react';
import { Style } from '../../App.style';

interface inputConfig {
    name: string;
    type: string;
    value: string;
    changed: any;
    style:any;
}
  

const input = (props:inputConfig) => {
    return (
    <div>
        <label style={Style.general}>{props.name}
        <input 
        name ={props.name} 
        type = {props.type } 
        value ={props.value} 
        onChange ={props.changed} 
        style = {props.style}/>
        </label>
    </div>
    )
} 

export default input;