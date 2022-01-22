const getBudgetedAmounts = () => {
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    let categories = JSON.parse(localStorage.getItem("categories"));
    let availableToBudget = 0;
    let budgetedAmount = 0;

    accounts.forEach(account => availableToBudget += account.balance);
    categories.forEach(category => {
        if (category.amount === 0) return;
        return budgetedAmount += category.amount;
    })

    let amountToBudget = availableToBudget - budgetedAmount;

    return { availableToBudget, budgetedAmount, amountToBudget };
};

export default getBudgetedAmounts;