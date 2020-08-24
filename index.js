const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert.js')

const apiBCB = require('./lib/api-bcb.js')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/' , async(req, res) => {
    const cotacao =  await apiBCB.getCotacao()
    const day = apiBCB.getToday()
    res.render('home',{
         cotacao,
         day
        })
})

app.get('/cotacao', (req, res) => {
    const {cotacao, quantidade} = req.query
    if(cotacao && quantidade)
    {
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error:false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    }else {
        res.render('cotacao' , {
            error:true
        })
    }
})

app.listen(3000, err => {
    if(err) {
        console.log('Connect Failed!')
    }else{
        console.log('ConvertMyMoney is Online')
    }
})