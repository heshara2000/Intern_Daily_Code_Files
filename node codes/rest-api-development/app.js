const express = require('express');

const app = express();

app.use(express.json());

let books=[
    {
        id:1,
        title:"The Alchemist",
    },
    {
        id:2,
        title:"The Monk who sold his Ferrari",
    },
    {
        id:3,
        title:"The Power of Now",
    }
];

//get all books
app.get('/',(req,res)=>{
    res.json({
        message: "welcome t book store"
    });
});

//get all books
app.get('/get',(req,res)=>{
    res.json(books);
});

//get book by id
app.get('/get/:id',(req,res)=>{
    const id = req.params.id;
    const book = books.find(book=>book.id == id);
    res.json(book);
});
//add book
app.post('/add', (req,res) => {
    const newbook = {
        id: books.length + 1,
        title: `Book ${books.length + 1}`
    }
    books.push(newbook);
    res.status(200).json({
        data : newbook,
        message: 'Book added successfully'
    });
});

//update book
app.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    const currentbook = books.find(booktype=>booktype.id == req.params.id);
    if(currentbook){
        currentbook.title = req.body.title || currentbook.title;
        res.status(200).json({
            message: 'Book updated successfully'
        });

    }else{
        res.status(404).json({
            message: 'Book not found'
        });
    }
});

//delete book
app.delete('/delete/:id',(req,res)=>{
    const findIndexofcurrentbook = books.findIndex(item=> item.id === req.params.id);
    if (findIndexofcurrentbook !==-1){
        const deletebook = books.splice(findIndexofcurrentbook,1);
        res.status(200).json({
            message: 'Book deleted successfully',
            data: deletebook
        });
    }else{
        res.status(404).json({
            message: 'Book not found'
        });
    }
        
});


const port = 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});