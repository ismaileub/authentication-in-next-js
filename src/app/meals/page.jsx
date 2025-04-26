import React from 'react';
import MealSearchInput from './components/MealSearchInput';
import Image from 'next/image';
import { Roboto } from 'next/font/google';


export const metadata = {
    title: "All meals",
    description: "All meals loaded from MealDB API",
};

const roboto = Roboto({
    weight: ["400", "600", "800"],
    subsets: ["latin"],
});


const MealsPage = async ({ searchParams }) => {

    //const query = await searchParams;
    // const searchQuery = searchParams?.search || "chicken";
    //const query = searchParams?.search ? searchParams : { search: "chicken" }; // default search term

    //const searchQuery = searchParams?.search;
    // const url = searchQuery === undefined
    //     ? "https://www.themealdb.com/api/json/v1/1/search.php?s"
    //     : `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;

    const search = await searchParams?.search;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search ?? ""}`;




    const fetchMeals = async () => {
        try {
            //const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query.search}`, {
            //const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`, {
            const res = await fetch(url, {
                cache: "force-cache"
            });
            const data = await res.json();
            //setMeals(data?.meals || []);
            return data.meals;
            //return data.meals ?? [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }


    const meals = await fetchMeals() ?? [];


    return (
        <div className="p-4  mx-auto">
            <h1 className="text-2xl font-bold mb-4">Meal Finder</h1>

            <MealSearchInput></MealSearchInput>

            {meals?.length === 0 && <p className='text-red-500'>No meals found.</p>}

            <div className='grid grid-cols-4'>
                {meals?.map((meal) => (
                    <div key={meal.idMeal} className="mb-8 border-b pb-4">
                        <h2 className={` ${roboto.className} text-xl font-semibold`} >{meal.strMeal}</h2>
                        {/* <img src={meal.strMealThumb} alt={meal.strMeal} className="w-64 rounded mt-2" /> */}
                        <Image src={meal.strMealThumb} alt={meal.strMeal} width={641} height={641} className="w-64 rounded mt-2"></Image>

                        <p className="mt-2 text-sm text-gray-700">{meal.strInstructions.slice(0, 200)}...</p>

                        <ul className="mt-2 text-sm">
                            {[...Array(20)].map((_, i) => {
                                const ingredient = meal[`strIngredient${i + 1}`];
                                const measure = meal[`strMeasure${i + 1}`];
                                return ingredient && ingredient.trim() ? (
                                    <li key={i}>✅ {measure} {ingredient}</li>
                                ) : null;
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MealsPage;
