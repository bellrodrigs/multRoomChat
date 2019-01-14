module.exports = function(application){
    application.get('/', function(req,res){
        //primeira referência é para o nome do arquivo e a segunda é o modulo que se encontra em controllers
        application.app.controllers.index.index(application,req,res);
    });
}