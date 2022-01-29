import CategoryService from "./category.service";

const CategoryRequest = {

    saveAccount: async (category, handleState, hide=null) => {
        let state = JSON.parse(localStorage.getItem("categories"));

        await CategoryService.create(category)
            .then(res => { state.push(res.data); handleState(state) })
            .catch(err => console.log(err));
        if (hide) hide();
    },
    
    addTransaction: async (id, amount, handleState) => {
        let state = JSON.parse(localStorage.getItem("categories"));

        return await CategoryService.transaction(id, amount)
            .then(() => {
                state = state.map(category => {
                    if (category._id === id) {
                        category.amount -= amount;
                        return category;
                    }
                    return category;
                });
                handleState(state);
            }).catch(err => console.log(err));
    },

    removeTransaction: async (id, amount, handleState) => {
        let state = JSON.parse(localStorage.getItem("categories"));
        let newAmount;
        state = state.map(c => {
            if (c._id === id) {
                c.amount += amount;
                newAmount = c.amount;
                return c;
            }
            return c;
        })

        await CategoryRequest.update(id, newAmount, "amount")
            .then(() => handleState(state))
            .catch(err => console.log(err));
    },

    deleteOne: async (id, handleState) => {
        let state = JSON.parse(localStorage.getItem("categories"));

        await CategoryService.delete(id)
            .then(() => {
                state = state.filter(category => category._id !== id);
                handleState(state);
            })
            .catch(err => console.log(err));
    }
};

export default CategoryRequest;