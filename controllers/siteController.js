

function renderForm (req, res) {
    res.render("formulario")
}

function getData (req, res) {
    
        let data = {
            nome: req.body.nome,
            profissao: req.body.profissao,
            sobre: req.body.sobre,
            email: req.body.email,
            linkedin: req.body.linkedin,
            github: req.body.github,
        }
    
        console.log(data)
    
        res.render("template_site", {data})
}

module.exports = {renderForm, getData}