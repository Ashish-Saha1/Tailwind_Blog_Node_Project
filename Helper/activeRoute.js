const activeRoute = (route, currentRoute)=>{
    return route === currentRoute? "text-gray-400" : "";
}


module.exports =  activeRoute
