    //const dictionary = require('../assets/data/locales/pt.json');
    //const test = "Telefone {telephone,5521972110298} já cadastrado"
    //const test = "E-mail já cadastrado"

    
    function errorHandle (error) {
        let errorMessage =  error && error.response && error.response.data && error.response.data.message ? error.response.data.message : 
                            error && error.response && error.response.data && error.response.data.data ? 'Por favor, revise as informações dos campos destacados.' : error.message
        return errorMessage
    }

    function errorConciliation(fields, error){
        console.log(fields)
        const errorFields = error && error.response && error.response.data && error.response.data.data && error.response.data.data.length > 0 && error.response.data.data.map( m => {
            return { 
                key: m.campo, 
                value: m.mensagem }
        }).reduce(
            (obj, item) => Object.assign(obj, { 
                [fields[item.key]]: item.value.replace('!', '')
            }), {})
        return errorFields
    }


    export {
        errorHandle,
        errorConciliation
    }