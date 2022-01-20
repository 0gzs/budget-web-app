import React from "react";
import CategoryService from './services/category.service';
import dollarUS from "../../services/currency-formatter";

const Categories = ({ categories, handleForm, handleUpdate }) => {

    const deleteAccount = id => {
        CategoryService.delete(id)
            .then(() => handleUpdate(id, "delete"))
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="flex flex-wrap justify-between items-center">
                <h5 className="text-left text-xl font-light text-gray-700">Categories</h5>
                <button 
                    className="bg-violet-600 py-2 px-3 rounded text-white font-bold hover:bg-violet-700 rounded-md"
                    onClick={() => handleForm("category")}>
                        New Category
                    </button>
            </div>
            <div className="flex overflow-x-auto space-x-3 my-2 py-2 pl-2 pr-4 no-scrollbar">
                {categories && categories.map((category, i) => {
                    return (
                        <div key={i} className="pl-4 pr-4 py-2 rounded-xl flex items-center flex-shrink-0 w-[220px]" style={{ backgroundColor: category.color }}>
                            <i className={`${category.icon} text-white text-[22px] mr-4`}></i>
                            <div className="w-4/5">
                                <p className="text-lg font-bold text-white">{category.name}</p>
                                <p className="text-sm text-white">{dollarUS.format(category.amount)}</p>
                            </div>
                            <i 
                                className="bi bi-trash hover:cursor-pointer"
                                onClick={() => deleteAccount(category._id)}
                                ></i>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Categories;