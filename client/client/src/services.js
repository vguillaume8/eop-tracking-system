function logout(){
    localStorage.removeItem('user');
}

module.exports = {
    logout: logout
}