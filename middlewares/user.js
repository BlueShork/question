module.exports = function(request, response, next){
    
    if(request.session.user){
        response.locals.user = request.session.user;
    }
    
    request.user = function(data){
        request.session.user = data;
    }
    next();

}