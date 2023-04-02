import express from "express"
import fs from "fs"
import path from 'path'
import React from 'react'
import ReactDomServer from 'react-dom/server'
import { StaticRouter } from "react-router-dom/server"
import App from "../src/App"

const PORT = 8000;
const app = express();
const router = express.Router();

router.get("/build",(req,res,next)=>{
    express.static('build')
})

router.get("*",(req,res)=>{
    const context = {}
    const app = ReactDomServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App/>
        </StaticRouter>
    )
    const indexFile = path.resolve('./build/index.html')
    fs.readFile(indexFile,'utf-8',(err,data)=>{
        console.log(err)
        if(err) return res.status(500).send("error");
        data = data.replace(`<div id="root"></div>`,`<div id="root">${app}</div>`)
        console.log(data)
        res.send(data)
    })
})

router.use(express.static(path.resolve(__dirname,'..','build'),{maxAge:'10d'}))
app.use(router);
app.listen(PORT)