let get_postconfig = function(){
    return {
        headers:{
            'Authorization':localStorage.getItem("token")
        }
    }
}

export {get_postconfig}
