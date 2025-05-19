import { Router } from 'express';
import { ObjectId } from 'mongodb';
const router = Router();

//schemas
import Task from '../schemas/schema_users.js';
import json_struct from '../schemas/returnStruct.js';

//middleware que agrega el header a cada ruta
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/tasks', async(_req, res) => {
  try {
    const tasks_found = await Task.find({})

    return res.send(json_struct({
      data: tasks_found
    }));

  } catch (error) {
    const lol = '[get_task] Something wrong at: ' + error
    return res.status(500).send(lol);
  }
});


router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    
    return res.send(json_struct({
      message: "Created!", data: task
    }));

  } catch (error) {
    const lol = '[post_task] Something wrong at: ' + error
    return res.status(500).send(lol);
  }

});

//NOTE: you should be using the uid as a parameter
router.delete('/tasks/:id', async (req, res)=>{
  try {
    const objectId = new ObjectId(req.params.id);
    
    const found = await Task.findOneAndDelete({ _id: objectId})

    return res.send(json_struct({
      message: "Deleted!",
      data: found
    }));

  } catch (error) {
    const lol = '[usr_del] Something wrong at: ' + error
    return res.status(500).send(lol);
  }
})


router.patch('/tasks/:id', async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
    const data = req.body;
    console.log("RECIBIENDO DEL PATCH: ", data)

    const task = await Task.updateOne(
      {_id: objectId}, {$set: data}
    )

    return res.send(json_struct({
      message: "Modified!",
      data: task
    }));
    
  } catch (error) {
    const lol = '[usr_mod] Something wrong at:  ' + error
    return res.status(500).send(lol);
  }

});

export default router;
