import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
import { Imdb } from "@styled-icons/fa-brands/Imdb"
import { FacebookSquare } from "@styled-icons/fa-brands/FacebookSquare";
import { Twitter } from "@styled-icons/fa-brands/Twitter";
import { Instagram } from "@styled-icons/fa-brands/Instagram";
import { Link } from "@styled-icons/fa-solid/Link";


// Pensa como podes reutilizar este codigo en lugar de repetirlo tantas veces. 
// Hay algo asi como mixins en styled-components: te lo menciono para que lo chusmees. 
const ImdbIcon = styled(Imdb)`
color: #FFF;
width: 30px;
height: 30px;
margin: 3px;
`
const FacebookIcon = styled(FacebookSquare)`
color: #FFF;
width: 30px;
height: 30px;
margin: 3px;
`
const TwitterIcon = styled(Twitter)`
color: #FFF;
width: 30px;
height: 30px;
margin: 3px;
`
const InstagramIcon = styled(Instagram)`
color: #FFF;
width: 30px;
height: 30px;
margin: 3px;
`

const LinkIcon = styled(Link)`
color: #FFF;
width: 30px;
height: 30px;
margin: 3px;
`

const CardStyle = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');
section {
    display: flex;
.poster {
    background-image: cover;
    width: 300px;
    height: 500px;
    padding: 30px;
    img {
        width: 100%;
        height: auto;
    }
}
.textDetails {
    width: 50%;
    padding: 30px;
    font-family: 'Roboto', sans-serif;
.external {
    display: flex;
    a {
        margin: 3px;
    }
}
}
}
`
// ese tabulado de arriba me hizo llorar un poco, debo confesarlo

const Info = ({props}) => {
  
    const params = useParams();
    const [external, SetExternal] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${params.id}/external_ids?api_key=ae73920dc1db068b1ee4b5b159748206`)
            .then(res => res.json())
            .then(data => SetExternal(data))
    }, [])

    // recorda siempre borrar los console log antes de entregar un trabajo 
    console.log(props)
    

    // Este componente esta muy bien para ser tan complejo, pero tener tanta logica en el JSX dificulta su lectura
    // Privilegia tener la logica separada y que el JSX sea lo mas sencillo posibles. 
    // Por ejemplo, aqui yo pondria la logica antes del return:
    // const generos = props.genres ? props.genres.map(genre => {return (<span>{genre.name} </span>)}) : ""
    // Y en el JSX escribimos asi:
    // <p>Géneros: {generos}</p>  

    return (

        <CardStyle>
        
        <section>
            <div className="poster">
                    <img src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`} 
                    alt={`${props.poster_path}`} />
            </div>
            <div className="textDetails">
                <h2>{props.original_title}</h2>
                <p>{props.vote_average}</p>
                <p>{props.overview}</p>
                <p>{`Duración: ${props.runtime} min`}</p>

                <p>Géneros: {props.genres != undefined ? props.genres.map(genre => {return (<span>{genre.name} </span>)}) : ""}</p>  

                <p>{`Recaudación: $${ (new Intl.NumberFormat().format(props.revenue))}`}</p>

                <p>Producción: {props.production_companies != undefined 
                ? props.production_companies.map(company => {return (<span>{company.name}, </span>)}) 
                : ""}</p>
            
                <div className="external">
                {/* En lugar de "es distinto a null" es preferible escribir directamente external.imdb_id 
                Como no estamos haciendo nada si la condicion no se cumple, yo preferiria usar && antes que ternario
                */}

                {external.imdb_id != null 
                ? <a href={`https://www.imdb.com/title/${external.imdb_id}`}> <ImdbIcon /></a>
                : ''}

{/* Fijate que aca por un espacio antes de TwitterIcon, ese icono no se muestra  */}
                {external.twitter_id != null 
                ? <a href={`https://twitter.com/${external.twitter_id}`}>< TwitterIcon /></a>
                : ''}

                {external.facebook_id != null 
                ? <a href={`https://www.facebook.com/${external.facebook_id}`}> <FacebookIcon /></a>
                : ''}

                {external.instagram_id != null 
                ? <a href={`https://www.instagram.com/${external.instagram_id}`}> <InstagramIcon /></a>
                : ''}
                
                {`${props.homepage}`
                ? <a href={`${props.homepage}`}> <LinkIcon /></a>
                : ''}
                
                </div>
            </div>
            
        </section>
  
        </CardStyle>
  
    )
}

export default Info;
