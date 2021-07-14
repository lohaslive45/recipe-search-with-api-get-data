//!==========食譜搜尋-主頁面==========
import React,{ useEffect, useState} from 'react';
import './Recipe01.css';

import Recipe02 from './Recipe02';

const Recipe01 = () => {
    const APP_ID = "254e96f2";
    const APP_KEY = "43c6f2ef229e23282f98567addd41570"

    
    const [recipes, setRecipes] = useState([]); //*---使用與網站來源相同格式，接收資料---
    const [search, setSearch] = useState("");//*---持續讀取搜尋欄，使用者輸入資料
    const [query, setQuery] = useState("chicken")//*---當使用者按下搜尋按鈕時，才會將搜索框內容帶入網站

    //*---此區塊只執行一次---避免 return()內 重複執行，避免運算效能浪費---
    useEffect(() => {
        getRecipes();
    },[query]);

    //*---獲取食譜網站資料---使用 async await 等待網站回復---
    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();
        setRecipes(data.hits);
    };

    const updateSearch = e => {
        setSearch(e.target.value);

    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch("");
    }

    return (
        <div className="recipe01">
            <form onSubmit={getSearch} className="search-form"> 
                <input 
                    className="search-bar" 
                    type="text" 
                    value={search} 
                    onChange={updateSearch}
                />
                <button className="search-button" type="submit">搜尋</button>
            </form>
            <div className="recipeBox">
            {recipes.map(recipeData =>(
                //*---以下為資料獲取，recipeData是替該網站資料陣列的自訂命名
                <Recipe02 
                    title={recipeData.recipe.label} //*---順著資料來源，選取需要的資料，recipe.label代表在recipe之下的label檔案
                    calories={recipeData.recipe.calories} 
                    image={recipeData.recipe.image}
                    ingredients={recipeData.recipe.ingredients}
                />
            ))}
            </div>
        </div>
    );
};

export default Recipe01;
