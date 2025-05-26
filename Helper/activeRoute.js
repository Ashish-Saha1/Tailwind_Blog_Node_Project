const activeRoute = (route, routeCurrently)=>{
    return route === routeCurrently? "text-gray-400" : "";
}


module.exports =  { activeRoute }
