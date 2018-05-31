export const isContainedInArray = (array, key, givenValue) => {
    let found = false;
    for(var i = 0; i < array.length; i++) {
        if (array[i][key] === givenValue) {
            found = true;
            break;
        }
    }
    return found;
};