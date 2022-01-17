import React, { useEffect, useState } from "react";
import CategoryService from '../services/category.service';
import dollarUS from "../utilities/currency-formatter";

const Categories = () => {
    const [categories, setCategories] = useState(() => {
        const storage = localStorage.getItem("categories");
        const parsed = JSON.parse(storage);

        return parsed || null;
    });

    useEffect(() => {
        if (!categories) getAll();
    }, [categories]);

    const getAll = () => {
        CategoryService.getAll()
            .then(res => {
                setCategories([...res.data]);
                localStorage.setItem("categories", JSON.stringify(res.data));
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="w-full flex items-center justify-between pr-4">
                <h5 className="text-left text-xl font-light text-gray-700">Categories</h5>
                <button className="px-3 py-2 bg-violet-600 hover:bg-violet-700 font-medium text-sm text-white rounded-md">New Category</button>
            </div>
            <div className="flex overflow-x-auto space-x-3 my-2 py-2 pl-2 pr-4">
                {categories && categories.map((category, i) => {
                    return (
                        <div key={i} className="pl-4 pr-4 py-2 rounded-xl flex items-center flex-shrink-0 w-[220px]" style={{ backgroundColor: category.color }}>
                            <i className={`${category.icon} text-white text-[22px] mr-4`}></i>
                            <div className="w-4/5">
                                <p className="text-lg font-bold text-white">{category.name}</p>
                                <p className="text-sm text-white">{dollarUS.format(category.amount)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Categories;