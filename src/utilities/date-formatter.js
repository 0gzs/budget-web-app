const dateFormatter = data => {
    const date = new Date(data);
    let options = {
        year: "numeric",
        month: "2-digit",
        day: "numeric"
    };
    
    return date.toLocaleDateString("en", options);
}

export default dateFormatter;