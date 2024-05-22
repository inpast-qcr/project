const getters ={
    token: state=>state.User.token,
    username: state=>state.User.username,
    password: state=>state.User.password,
    userInfo: state=>state.User.userInfo,
}

export default getters