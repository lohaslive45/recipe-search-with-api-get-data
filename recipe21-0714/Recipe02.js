import React from 'react'
import style from "./Recipe02.module.css"

const Recipe02 = ({title, calories, image, ingredients}) => {
    return (
        <div className={style.recipeFor02}>
            <h1>{title}</h1>
            <ol>
                {ingredients.map(ingredient =>(
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <p>{calories}</p>
            <img className={style.imageFor02} src={image} alt="" />
        </div>
    )
}

export default Recipe02
