import { useEffect, useState } from "react";
// import CategoryService from "../domain/category/services/CategoryService";

const useCategories = () => {
    const [categories, setCategories] = useState(() => {
        let storage = localStorage.getItem("categories");
        
        return JSON.parse(storage) || null;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        setLoading(true);

        // CategoryService.getAll()
        //     .then(res => {
        //             setCategories([...res.data]);
        //             setError(null);
        //             localStorage.setItem("categories", JSON.stringify(res.data));
        //     })
        //     .catch(err => {
        //         if (isMounted) setError(err);
        //     })
        //     .finally(() => (isMounted && setLoading(false)))

        return () => (isMounted = false);
    }, [loading]);
    useEffect(() => { localStorage.setItem("categories", JSON.stringify(categories))}, [categories]);

    const handleCategoriesUpdate = (response, action) => {
        let categoriesState = [...categories];

        if (action === "add") {
            categoriesState.push(response);
        } else {
            categoriesState = categoriesState.filter(category => category._id === response);
        }
        setCategories([...categoriesState]);
    };

    return { categories, error, loading, handleCategoriesUpdate}
};

export default useCategories;