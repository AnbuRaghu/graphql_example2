const graphql=require('graphql');
const _ = require('lodash');

const{GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList}=graphql;

//dummy data
var books=[{name:"book 1",genre:"genre 1",id:"1",authorId:"1"},
{name:"book 2",genre:"genre 2",id:"2" ,authorId:"2"},
{name:"book 3",genre:"genre 3",id:"3" ,authorId:"3"},
{name:"book 4",genre:"genre 4",id:"4" ,authorId:"2"},
{name:"book 5",genre:"genre 5",id:"5" ,authorId:"3"},
{name:"book 6",genre:"genre 6",id:"6" ,authorId:"1"},
]

var authors=[
    {name:"author 1", age:29,id:"1"},
    {name:"author 2", age:23,id:"2"},
    {name:"author 3", age:39,id:"3"},
]


// type definition / bookType
const BookType=new GraphQLObjectType({// it takes an object we set whichever value we need for book  
name:'Book',//1st parametr is name
fields:()=>({// we can use it as object but prefered way is to function
    //id:{type:GraphQLString},
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    author:{// here we mapped author with book
        type:AuthorType,
        resolve(parent,args){
            return _.find(authors,{id:parent.authorId})// parent means here Book has the uthor id so we need get it from parent
        }
    }

})
})

// define AuthorType
const AuthorType=new GraphQLObjectType({// it takes an object we set whichever value we need for book  
    name:'Author',//1st parametr is name
    fields:()=>({// we can use it as object but prefered way is to function
        //id:{type:GraphQLString},
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorId:parent.id})// here parent means authors

                

            }

        }
    
    })
    })
//define root query / query definition

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
           /// args:{id:{type:GraphQLString}},// we got the data by id
           args:{id:{type:GraphQLID}},// to give it as String
            resolve(parent,args){
                //code to get data from DB/other source
                console.log(typeof(args.id))
                return _.find(books,{id:args.id});
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},// to give it as String
            resolve(parent,args){
                //code to get data from DB/other source
                console.log(typeof(args.id))
                return _.find(authors,{id:args.id});
            }
        },
        // to show list of all books
        books:{
            type:new GraphQLList( BookType),
            resolve(parent,args){
                return books;
            }
        },
        authors:{
            type:new GraphQLList( AuthorType),
            resolve(parent,args){
                return authors;
            }
        }
        
    }
});

module.exports=new GraphQLSchema({// we export it as a graphql schema
    query:RootQuery
})