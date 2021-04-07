const express=require('express');
const expressGraphQl=require('express-graphql');

const schema = require('./schema/schema');
const port =4800;
const app=express();

app.use('/graphql',expressGraphQl({
   // schema:schema // if key and value are same we need not to use both key and values only key is enough as shown below
    schema,// we should provide which schema to run
    graphiql:true
}));
app.listen(port,()=>{
    console.log('The server is running on port : '+port) 
})