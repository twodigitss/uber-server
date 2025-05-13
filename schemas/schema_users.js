//=============================================================
// MONGOOSE MONGOOSE MONGOOSE MONGOOSE MONGOOSE MONGOOSE
//=============================================================
//https://www.geeksforgeeks.org/how-to-connect-node-js-to-a-mongodb-database/

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    title:        { type: String,   required: false },
    description:  { type: String,   required: true  },
    completed:    { type: Boolean,  required: true  },
    timestamp:    { type: Date,     required: true, default: Date.now }

  }, { 
    collection: 'todo_tasks' 
  }
);

const Task = mongoose.model(
  "todo_tasks", userSchema
);

export default Task;
