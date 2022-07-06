import React from "react"

const AppContext = React.createContext({loggedIn : false, user : {}, images : [], likedImages: [], setLikedImages: () => {}})

export default AppContext