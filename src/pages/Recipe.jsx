import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Recipe = () => {
    const [recipeDetails, setRecipeDetails] = useState({});
    let params = useParams();

    const [activeTab, setActiveTab] = useState('instruction');

    const getRecipeDetails = async () => {
        const fetchDetails = await fetch (`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_FOOD_API_KEY}`);
        const detaildata = await fetchDetails.json();
        setRecipeDetails(detaildata);
    }

    useEffect(()=>{
        getRecipeDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <div>
                <h2>{recipeDetails.title}</h2>
                <img src={recipeDetails.image} alt={recipeDetails.title} />
            </div>
            <Info>
                <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={()=>setActiveTab('instructions')}>Instructions</Button>
                <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={()=>setActiveTab('ingredients')}>Ingredients</Button>
                {activeTab === 'instructions' && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html:recipeDetails.summary }}></h3>
                        <h3 dangerouslySetInnerHTML={{ __html:recipeDetails.instructions }}></h3>
                    </div>
                )}
                
                {activeTab === 'ingredients' && (
                    <ul>
                        {recipeDetails.extendedIngredients?.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}
                
            </Info>
        </DetailWrapper>
    )
}

const DetailWrapper = styled.div`
    margin-bottom: 5rem;
    margin-top: 10rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid #000000;
    margin-right: 2rem;
    font-weight: 600;

    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
`;

const Info = styled.div`
    margin-left: 10rem;
`;

export default Recipe;