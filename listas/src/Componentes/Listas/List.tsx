import * as React from 'react';
import { Style } from '../Listas/App.style';
const list = (props:any) => (
    <article style= {Style.general}>
        <h1 style = {Style.labels}>{props.title}</h1>
        <div>
            <div>{props.author}</div>
        </div>
    </article>
);

export default list;