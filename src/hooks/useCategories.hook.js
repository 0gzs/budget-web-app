import { useEffect, useState } from "react";
import CategoryService from '../domain/category/services/category.service';

const useCategories = () => {
    const [categories, setCategories] = useState(() => {
        let storage = localStorage.getItem("categories");
        
        return JSON.parse(storage) || null;
    });

    useEffect(() => !categories && getAll());

    const getAll = () => {
        CategoryService.getAll()
            .then(res => {
                    setCategories([...res.data]);
                    localStorage.setItem("categories", JSON.stringify(res.data));
            })
            .catch(err => console.error(err))
    };

    const handleCategoriesUpdate = (response, action) => {
        let categoriesState = [...categories];

        if (action === "add") {
            categoriesState.push(response);
        } else {
            categoriesState = categoriesState.filter(category => category._id != response);
        }
        setCategories([...categoriesState]);
        localStorage.setItem("categories", JSON.stringify([...categoriesState]))
    };

    return { categories, handleCategoriesUpdate}
};

export default useCategories;