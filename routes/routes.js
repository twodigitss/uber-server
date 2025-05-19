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
    return res.status(500).send(`[get_task] Something wrong at:  ${error}`);
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
    return res.status(500).send(`[post_task] Something wrong at:  ${error}`);
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
    return res.status(500).send(`[usr_del] Something wrong at:  ${error}`);
  }
})


router.patch('/tasks/:id', async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
    const data = req.body;

    // No eliminar los valores falsy si son booleanos
    Object.keys(data).forEach(key => {
      // Si el valor es falsy y la propiedad no es un booleano, eliminarla
      if (data[key] === undefined || data[key] === null) {
        delete data[key];
      }
    });

    // Hacer la actualización en la base de datos
    const task = await Task.updateOne(
      { _id: objectId },
      { $set: data }
    );

    // Revisamos si la tarea fue actualizada correctamente
    if (task.modifiedCount === 0) {
      return res.status(404).send(json_struct({
        message: "Task not found or no changes made"
      }));
    }

    return res.send(json_struct({
      message: "Modified!",
      data: data // Enviar los datos actualizados
    }));
    
  } catch (error) {
    return res.status(500).send(`[usr_mod] Something wrong at:  ${error}`);
  }
});


export default router;
