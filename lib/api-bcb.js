const axios = require('axios')

const getToday = () => {
    const today = new Date() 
    const isSunday = today.getDay() == 0
    const isMonday = today.getDay() == 1
    if(isMonday){
        return ((today.getMonth()+1) +'-'+ (today.getDate()-3) +'-'+ today.getFullYear())
    }else if(isSunday){
        return ((today.getMonth()+1) +'-'+ (today.getDate()-2) +'-'+ today.getFullYear())
    }else{
        return ((today.getMonth()+1) +'-'+ (today.getDate()-1) +'-'+ today.getFullYear())
    }
}

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = (url) => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoCompra 
const getCotacao = ({ getToday, getCotacaoAPI, getUrl, extractCotacao}) => async() => {
    try {
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao
    }catch(err) {
        return ''
    }   
}

module.exports = {
    getCotacaoAPI,
    getCotacao: getCotacao({ getToday, getCotacaoAPI, getUrl, extractCotacao}),
    extractCotacao,
    getUrl,
    getToday,
    pure: {
        getCotacao
    }
}