const checkUserLogin = (username, password) => {
    let userId = username.split('traveler')[1]
    userId = parseInt(userId)
    
    if (userId >= 1 && userId <= 50 && password == 'travel') {
        return userId
    } else if (password === ''|| username === ''){
        return 'Empty Input'
    } else if(password != 'travel') {
        return 'Password Error'
    } else {
        return 'Username Error'
    }
};

export {
    checkUserLogin,
};