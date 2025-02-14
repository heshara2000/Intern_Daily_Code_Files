const Book = require('../models/book');


const getAllbook = async (req, res) => {
    try{
        const allBooks = await Book.find({});
        if(allBooks?.length > 0){
            res.status(200).json({
                success: true,
                message: "All books fetched successfully",
                data: allBooks
            });
        }
    }
    catch(e){
        console.log(e);
    }
};

const singlebookbyid = async (req, res) => {
    try{
        const getcurrentbookid = req.params.id;
        const bookDetailsbyid = await Book.findById(getcurrentbookid);
        if(!bookDetailsbyid){
            return res.status(404).json({
              success : false,
              message : 'not found'

            })
        }
        res.status(200).json({
            success : true,
            message : 'founf the book'
        })

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const addbook = async (req, res) => {
    try{
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData);
        if(newlyCreatedBook){
            res.status(201).json({
                success: true,
                message: "Book created successfully",
                data: newBookFormData
            });
        }
    }
    catch(e){
        console.log(e);

    }
};

const updatebook = async (req, res) => {
    try {
        const updatedBookFormData = req.body;
        const getCurrentBookID = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(
          getCurrentBookID,
          updatedBookFormData,
          {
            new: true,
          }
        );
    
        if (!updatedBook) {
          res.status(404).json({
            success: false,
            message: "Book is not found with this ID",
          });
        }
    
        res.status(200).json({
          success: true,
          message: "Book updated successfully",
          data: updatedBook,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({
          success: false,
          message: "Something went wrong! Please try again",
        });
      }
};

const deletebook = async (req, res) => {
    try {
        const getCurrentBookID = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(getCurrentBookID);
    
        if (!deletedBook) {
          res.status(404).json({
            success: false,
            message: "Book is not found with this ID",
          });
        }
    
        res.status(200).json({
          success: true,
          data: deletedBook,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({
          success: false,
          message: "Something went wrong! Please try again",
        });
      }
};


module.exports ={getAllbook,singlebookbyid,addbook,updatebook,deletebook};

