module.exports.iniciaChat = function(application, req, res){
    
    var dadosForm = req.body;

    req.assert('apelido','Nome ou Apelido é obrigatório').notEmpty();
    req.assert('apelido','Nome ou Apelido deve conter entre 3 e 15 caractéres').len(3, 15);
    
   var error = req.validationErrors();

    if(error){
        res.render('index', {validacao: error});
        return;
    }
        application.get('io').emit(
            'msgCliente',
            {
                apelido: dadosForm.apelido, 
                mensagem:'  entrou no chat'
            }
            );
        res.render("chat", {dadosForm: dadosForm});
    
    
}