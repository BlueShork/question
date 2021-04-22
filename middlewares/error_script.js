module.exports = function(request, response, next){

    if(request.session.flash){
        response.locals.flash = request.session.flash;
    }

    
    request.flash = function(type, content){
        request.session.flash[type] = content;
    }


    next();



}