
import cors from "cors"
import express, {json} from "express"
import { db } from "./db.js"
//Ajuda a pegar o valor do corpo do formulario
import bodyParser from "body-parser"

const app = express()

app.use(cors());
app.use(json());

// habilita a pegar cada um dos dados do corpo da requisicao
app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())


//Get vai ir buscar os dados dos usuario
app.get("/allUsers", (req, res)=>{
    let sql = "select * from userdata"
    db.query(sql,(err, result)=>{
        if(err) return console.log({message:"Erro na query"})
        return res.json(result)

    })
})
// CADASTRAR USUARIO
app.post("/formulario", (req, res)=>{
    const {p_nome,s_nome,email,senha} = req.body
    let sql2 = `insert into userdata (id, nome, S_nome, email, Senha) 
    VALUES(DEFAULT, '${p_nome}', '${s_nome}', '${email}', '${senha}' );`
    let verify = `select * from userdata where email='${email}'`
    db.query(verify,(err,data)=>{
        if (err) return res.json({message:"SERVER ERROR"})
            if(data.length>0){
                return res.json({message:"EXISTS"})
            }else{
                db.query(sql2,(err, result)=>{
                    if(err) return res.json({message:"Erro no Cadastro"})
                        db.query(verify,(err,data)=>{
                            if(err) return res.json({message:"ERROR"})
                                res.json(data)
                        })
            
                })
            }
    })
})
//VERIFICAR USUARIO
app.post("/login", (req, res)=>{
    let email = req.body.email;
    let senha = req.body.senha;
    let sql = `select * from userdata where email='${email}' and Senha='${senha}';`
    db.query(sql,(err,data)=>{
        if(err) return res.json({message:"SERVER ERROR"})
            if(data.length>0){
                res.json(data)
            }else{
                res.json({message:"NOT EXISTS"})
            }
    })
})
//APAGAR USUARIO
app.delete("/eraseData/:id",(req, res)=>{
    const {id}=req.params
    let sql = `delete from userdata where id=${id};`
    db.query(sql,(err)=>{
        if(err) return res.json({message:"ERROR"})
        res.json({message:"SUCESS"})
    })
})
//ATUALIZAR DADOS DO USUARIO
app.put("/update", (req, res)=>{
    const {id, novoNome, snome,pass, email} = req.body
    let sql = `update userdata set nome='${novoNome}', S_nome='${snome}',email='${email}',Senha='${pass}' where id=${id};`
    let verify = `select * from userdata where email='${email}'`
    db.query(verify,(err, data)=>{
        if(err) return res.json({message:"ERROR"})
            if(data.length>=1 && data[0].id !== id){
                res.json({message:"ALREADY EXISTS"})
            }else{
                db.query(sql, (err, result)=>{
                    if(err) return res.json({message:"ERROR"})
                        res.json({message:"SUCESS"})
                })
            }
    })
})






//COMENTARIO
app.post("/comentario", (req, res)=>{
    const {comentario,avaliacao} = req.body
    let sql2 = `insert into comentarios (comentario, avaliacao) 
    VALUES('${comentario}', ${avaliacao});`
    db.query(sql2,(err,data)=>{
        if (err){ return res.json({message:"SERVER ERROR"})
        }else{
            return res.json(data)
            }
    })
})
//COMENTARIO
app.get("/comentario", (req, res)=>{
    const {comentario,avaliacao} = req.body
    let sql2 = `select*from comentarios;`
    db.query(sql2,(err,data)=>{
        if (err){ return res.json({message:"SERVER ERROR"})
        }else{
            return res.json(data)
            }
    })
})
//COMENTARIO
app.put("/comentario/:id", (req, res)=>{
    const id= req.params.id
    const {comentario,avaliacao} = req.body
    let sql2 = `update comentarios set  comentario='${comentario}', avaliacao=${avaliacao}) where id=${id};`
    db.query(sql2,(err,data)=>{
        if (err){ return res.json({message:"SERVER ERROR"})
        }else{
            return res.json(data)
            }
    })
})
//COMENTARIO
app.delete("/comentario/:id", (req, res)=>{
    const id= req.params.id
    const {comentario,avaliacao} = req.body
    let sql2 = `delete from comentarios  where id=${id};`
    db.query(sql2,(err,data)=>{
        if (err){ return res.json({message:"SERVER ERROR"})
        }else{
            return res.json(data)
            }
    })
})


const port = 3333
app.listen(port, ()=>{
    console.log(`SERVIDOR RODANDO NO ENDERECO http://localhost:${port}`)
})