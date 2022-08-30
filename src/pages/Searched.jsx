import React from 'react';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import styled from 'styled-components';


function Searched() {
    const [searchedRecipes, setSearchedRecipes] =useState([]);
    let params = useParams();
    const getSearched= async (name) => {
        console.log(params+ "what");
        const data = await fetch (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}
       `); 
       const recipes = await data.json();
       
       setSearchedRecipes(recipes.results);
    };
    useEffect(() =>{
        getSearched(params.search);
    }, [params.search]);
  return (
    <div>
     <Grid>
         {searchedRecipes.map((item) => {
           return (
            <Card key ={item.id}>
                <Link to= {'/recipe/' + item.id}>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                </Link>
            
        </Card>
           )
           
         })}
     </Grid>
    </div>
  )
}
const Grid = styled.div`
 

 display: grid; 
 grid-template-columns: 1fr 1fr 1fr; 
 grid-template-rows: 1fr 1fr 1fr; 
 gap: 3rem;

 `;
 const Card  = styled.div`
 img{
     width:100%;
     border-radius: 2rem;
 }
 a {
     text-decoration: none;
 }
 h4{
     text-align: center;
     padding: 3rem;
 };
 `;
export default Searched;
