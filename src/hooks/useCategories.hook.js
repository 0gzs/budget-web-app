import { useEffect, useState } from "react";
import { getAllCategories } from "../services/CategoryService";

const useCategories = () => {
    const [categories, setCategories] = useState(() => {
        let storage = localStorage.getItem("categories");
        
        return JSON.parse(storage) || null;
    });
    
    const store = data => {
        if (!data) return setCategories(null);
        setCategories([...data]); 
        localStorage.setItem("categories", JSON.stringify(data))
    };

    useEffect(() => {
        if (!categories) getCategories();

        async function getCategories() {
            const data = await getAllCategories();
            store(data);
        }
    });

    const handleCategories = data => store(data);

    return { categories, handleCategories };
};

export default useCategories;