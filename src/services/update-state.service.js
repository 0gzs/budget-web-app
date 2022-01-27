const UpdateState = {
    add: (response, storage) => {
        let currentState = JSON.parse(localStorage.getItem(storage));
        currentState.push(response);
        return [...currentState];
    },
    update: (response, storage) => {
        let currentState = JSON.parse(localStorage.getItem(storage));
        currentState = currentState.filter(obj => obj._id !== response._id);
        currentState.push(response);
        return [...currentState]
    }
};

export default UpdateState;