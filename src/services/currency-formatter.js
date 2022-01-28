const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export const formatWihoutSymbol = amount => {
    let a = dollarUS.format(amount);
    a =  a.split('');
    a.shift();
    return a.join('');
}

export default dollarUS;