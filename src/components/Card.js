import React from 'react';
import styled from 'styled-components';
import noDisponible from '../assets/nodisponible.png' 

// atencion al tabulado desprolijo
const CardStyle = styled.div`
display: flex;
flex-wrap: wrap;
width: 264px;
height: 396px;
background-image: cover;
margin: 40px 5px 60px 5px;
h3 {
    font-weight: 200;
}
h2 {
    font-weight: 200;
}
img {
    width: auto;
    height: 100%;
}
`

const Card = ({ poster, name, title, character, photo, site }) => {
    return (
        <CardStyle>   
        {/* seria preferible escribir esta logica asi:
        poster || photo ?           */}
        {poster != null || photo != null ? 
        <img src={`https://image.tmdb.org/t/p/w500${poster ? poster : photo}`} alt={`${title ? title : name}`}></img>
        : <img src={noDisponible} alt={"Imagen no disponible"}></img>}
        <div>    
        {/* No es necesaria aqui esta validacion: si "title" es undefined React no escribe undefined, sino que lo deja vacio.    */}
        <h3>{title ? title : ""}</h3>
        <h3>{name ? name : ""}</h3>
        <h4>{character ? character : ""}</h4>
        <h3>{site ? site : ""}</h3>
        </div>
        </CardStyle>

    )
}


export default Card;
