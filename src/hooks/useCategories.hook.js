import { useEffect, useState } from "react";
import CategoryService from "../components/categories/services/category.service";

const useCategories = () => {
    const [categories, setCategories] = useState(() => {
        let storage = localStorage.getItem("categories");
        
        return JSON.parse(storage) || null;
    });

    useEffect(() => !categories && getAll());

    const store = data => {
        setCategories([...data]); 
        localStorage.setItem("categories", JSON.stringify(data))
    };

    const getAll = () => {
        CategoryService.getAll()
            .then(res => store(res.data))
            .catch(err => console.error(err))
    };

    const handleCategories = cats => setCategories(cats);

    return { categories, handleCategories };
};

export default useCategories;