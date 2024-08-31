
import {createConnection} from "mysql"


export const db = createConnection({
    user:"root",
    password:"",
    host:"localhost",
    port:"3306",
    database:"Compras"
})
db.connect(err=>{
    if(err) return console.log("ERRO AO CONECTAR COM BANCO DE DADOS")
        console.log("CONECTADO AO BANCO DE DADOS")
})