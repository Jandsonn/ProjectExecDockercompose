const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))
    /*renderiza a página para arquivo home.handlebars*/
app.get('/', (req, res) => {
    res.render('home')
})

/**Extração de dados aqui */
app.post('/nome/insertname', (req, res) => {

    const nome = req.body.nome;
    const idade = req.body.idade;
    const local = req.body.local;
    const doacao = req.body.doacao;

    const sql = `INSERT INTO nome (nome, idade,local,doacao) VALUES ('${nome}','${idade}','${local}','${doacao}')`

    conn.query(sql, function(err) {
        if (err) {
            console.log(`apresentou um erro ${err}`);
            return
        }
        res.redirect('/')
    })
})


/**Aqui redireciona os dados do banco para uma página HTML */
app.get('/nome', (req, res) => {
    const query = "SELECT*FROM nome"
    conn.query(query, function(err, data) {
        if (err) {
            console.log(err)
        }

        const nome = data

        console.log(nome)

        res.render('nome', { nome })


    })
})





const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jandefake3',
    database: 'nodemysql3',
})

conn.connect(function(err) {
    if (err) {
        console.log(err)
    }

    app.listen(3000)
    console.log('conneted in port 3000')

})