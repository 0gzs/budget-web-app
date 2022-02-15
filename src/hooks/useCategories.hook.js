import { useEffect, useState } from "react";
import { getCategories } from "../services/CategoryService";

const useCategories = () => {
    const [categories, setCategories] = useState(() => {
        let storage = localStorage.getItem("categories");
        
        return JSON.parse(storage) || null;
    });
    
    const store = data => {
        setCategories([...data]); 
        localStorage.setItem("categories", JSON.stringify(data))
    };

    useEffect(() => {
        if (!categories) getAllCategories();

        async function getAllCategories() {
            const data = await getCategories();

            data && store(data);
        }
    }, [categories]);

    const handleCategories = data => store(data);

    return { categories, handleCategories };
};

export default useCategories;