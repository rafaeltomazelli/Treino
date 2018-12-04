
import React from 'react';
import { Style } from '../App.style';

const input = (props) => {
    return (
    <div>
        <label style={Style.general}>{props.name}</label>
        <input name ={props.name} type = {props.type } value ={props.value} onChange ={props.changed} style = {Style.box}/>
    </div>
    )
} 

export default input;