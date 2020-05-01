const express = require('express');
const app = express();

app.use('/static',express.static('public'));

app.set('view engine','pug');

const {projects} = require('./data.json');
//const {projects} = data;

//const indexRoutes = require('./');
//const aboutRoutes = require('./about');
//let projectRoutes = require('./project');

app.get('/',(req,res)=>{
    //const name = req.cookies.username;
    //if(name){
    res.render("index",{projects});
    //}else{
    //    res.redirect('/hello');
    //}
    //res.send("Hellow world");
});

app.get('/about',(req,res)=>{
    res.render("about");
    //res.send("Hellow world");
});

app.get('/project/:projectId',(req,res)=>{
    const {projectId} = req.params;
    //console.log(projectId);
    const project = projects[projectId];
    //console.log(project);
    res.render("project",{project});
    //res.send("Hellow world");
});

app.use((req,res,next)=>{
    //console.log("Catching Error....");
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err,req,res,next)=>{
    res.locals.error = err;
    res.status(err.status);
    res.render("error");
});

app.listen(3000, ()=>{
    console.log("The app is running on localhost:3000");
});