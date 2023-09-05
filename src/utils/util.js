function getUserName(user) {
    return user?.firstName ? user.firstName : 'Someone';
}

function arrayToMap(array, keyField) {
    return array.reduce((map, item) => {
        map[item[keyField]] = item;
        return map;
    }, {});
}

export { getUserName, arrayToMap };