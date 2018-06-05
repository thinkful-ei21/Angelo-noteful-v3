const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { MONGODB_URI } = require('../config');

const { Note } = require('../models/note');

mongoose.connect(MONGODB_URI)
  .then(() => {
    const searchTerm = 'lady gaga';
    let filter = {};
    let re;

    if (searchTerm) {
      re = new RegExp(searchTerm, 'i');
      filter.title = { $regex: re };
      filter.content = { $regex: re };
    }
    
    return Note.find({$or: [{title: {$regex: re}}, {content: {$regex: re}}]})
      .sort('created')
      .then(results => {
        console.log(results);
      })
      .catch(console.error);
  })
  .then(() => {
    return mongoose.disconnect()
      .then(() => {
        console.info('Disconnected');
      });
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

// mongoose.connect(MONGODB_URI)
//     .then(() => {
//         let id = '000000000000000000000003';
//         return Note.findById(id)
//         .then(result => {
//             console.log(result);
//         })
//         .catch(err => {
//             console.error(err);
//         })
//     })
//     .then(() => {
//         return mongoose.disconnect()
//             .then(() => {
//                 console.info('Disconnected');
//             });
//     });

// mongoose.connect(MONGODB_URI)
//     .then(() => {
//         const updateItem = {title: 'new item to be added', content: 'some text to insert'};
//         const requiredFields = ['title', 'content'];
//         for (let i = 0; i < requiredFields.length; i++) {
//             const field = requiredFields[i];
//             if (!(field in updateItem)) {
//                 const message = `Missing \`${field}\` in request body`;
//                 console.error(message);
//                 return res.status(400).send(message);
//             }
//         }

//         return Note.create({
//             title: updateItem.title, 
//             content: updateItem.content
//         })
//         // .then(note => res.status(201).json(note.serialize()))
//         .then(note => console.log(note));
//     })
//     .then(() => {
//         return mongoose.disconnect()
//             .then(() => {
//                 console.info('Disconnected');
//             })
//     })

// mongoose.connect(MONGODB_URI)
//     .then(() => {
//         let id = '000000000000000000000003';
//         const updateable = ['title', 'content'];
//         const toUpdate = {title: 'Suu whoop'};
//         const newUpdate = {}

//         updateable.forEach(field => {
//             if (field in toUpdate) {
//                 newUpdate[field] = toUpdate[field];
//             }
//         });

//         return Note.findByIdAndUpdate(id, {$set: toUpdate})
//         .then(result => console.log(result))
//     })
    
//     .then(() => {
//         return mongoose.disconnect()
//             .then(() => {
//                 console.info('disconnected');
//             });
//     })
//     .catch(err => {
//         console.error(err);
//     });

// mongoose.connect(MONGODB_URI)
//     .then(() => {
//         let id = '000000000000000000000003';
//         return Note.findByIdAndRemove(id)
//             .then(console.log('removed'));
//     })
//     .then(() => {
//         return mongoose.disconnect()
//             .then(() => {
//                 console.info('disconnected');
//             });
//     })
//     .catch(err => {
//         console.error(err);
//     });