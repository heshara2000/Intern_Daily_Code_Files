// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://hesharadananjanee:YY7ZChnhJwrOeGMd@cluster0.yghsd.mongodb.net/').then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.log('Error:', err.message);
// });


//     const userSchema = new mongoose.Schema({
//         name: String,
//         email : String,
//         age : Number,
//         isActive : Boolean,
//         tags : [String],
//         createdAte : { type: Date, default: Date.now }
// });
// // Create a model
// const User = mongoose.model('User', userSchema);
// async function runQueryExamples() {
//     try{
//         // Create a document
//         const newUser = await User.create({
//             name: 'HESH',
//             email : 'hesharadananjanee@gmail.com',
//             age : 30,
//             isActive : true,
//             tags : ['Developer','designer'],
//         })
//         console.log('New User:', newUser);
//     }
//     catch(e){
//         console.log('Error:',e);
//     }finally{
//         await mongoose.disconnect();  
// }
// };

const mongoose = require('mongoose');  
mongoose.connect('mongodb+srv://hesharadananjanee:YY7ZChnhJwrOeGMd@cluster0.yghsd.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error:', err.message);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAte: { type: Date, default: Date.now }  // Typo in "createdAte", it should be "createdAt"
});

// Create a model
const User = mongoose.model('User', userSchema);

async function runQueryExamples() {
  try {
    // Create a document
    const newUser = await User.create({
      name: 'HESH',
      email: 'hesharadananjanee@gmail.com',
      age: 30,
      isActive: true,
      tags: ['Developer', 'Designer'],
    });
    console.log('New User:', newUser);
  } catch (e) {
    console.log('Error:', e);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the function
runQueryExamples();
