const express = require('express')
const { PrismaClient } = require('@prisma/client')
const path = require('path');
const cors = require('cors')

const port = 5000
const prisma = new PrismaClient()

async function createRole(dtoIn){
  try{
    const { name } = dtoIn
    if (!name||name.length==0){
      throw new Error("wrong name")
    }
    const result = await prisma.role.create({
      data: {
        name
      },
    })
    return result
  } catch(e){
    return {"error": e}
  }
}

async function createUser(dtoIn){
  try{
    const { name, surname, email, roleId } = dtoIn
    if (!name||name.length==0){
      throw new Error("wrong name")
    }
    if (!surname||surname.length==0){
      throw new Error("wrong surname")
    }
    if (!email||email.length==0){
      throw new Error("wrong email")
    }
    if (!roleId||!Number.isInteger(roleId)){
      throw new Error("wrong roleId")
    }
    const result = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        roleId
      },
    })
    return result
  } catch(e){
    return {"error": e}
  }
}

async function createTaskList(dtoIn){
  try{
    const { name, description, creationDate, userId } = dtoIn
    if (!name||name.length==0){
      throw new Error("wrong name")
    }
    if (!description||description.length==0){
      throw new Error("wrong description")
    }
    if (!creationDate||creationDate.length==0){
      throw new Error("wrong date")
    }
    if (!userId||!Number.isInteger(userId)){
      throw new Error("wrong userId")
    }
    const result = await prisma.taskList.create({
      data: {
        name,
        description,
        creationDate,
        userId
      },
    })
    return result
  } catch(e){
    return {"error": e}
  }
}

async function readTaskList(dtoIn){
  try{
    const { id } = dtoIn
    if (!id||id.length==0){
      throw new Error("wrong id")
    }
    const taskList = await prisma.taskList.findUnique({
      where: { id: Number(id) },
    })
  
    const tasks = await prisma.task.findMany({
      where: { taskListId: Number(id) },
    })
    taskList["tasks"] = tasks

    const user = await prisma.user.findUnique({
      where: { id: Number(taskList.userId) },
    })
    taskList["user"] = user
    return taskList
  } catch(e){
    return {"error": e}
  }
}

async function readTaskLists(){
  try{
    const taskLists = await prisma.taskList.findMany()
    taskListNames = []
    for (let i = 0; i < taskLists.length; i++) {
      taskListNames.push(`${taskLists[i].id}.${taskLists[i].name}`)
    }
    return taskListNames
  } catch(e){
    return {"error": e}
  }
}

async function createTask(dtoIn){
  try{
    const { name, description, due, priority, status, taskListId } = dtoIn
    if (!name||name.length==0){
      throw new Error("wrong name")
    }
    if (!description||description.length==0){
      throw new Error("wrong description")
    }
    if (!due||due.length==0){
      throw new Error("wrong due date")
    }
    if (!priority||!Number.isInteger(priority)){
      throw new Error("wrong priority")
    }
    if (!status||!Number.isInteger(status)){
      throw new Error("wrong status")
    }
    if (!taskListId||!Number.isInteger(taskListId)){
      throw new Error("wrong taskListId")
    }
    const result = await prisma.task.create({
      data: {
        name,
        description,
        due,
        priority,
        status,
        taskListId
      },
    })
    return result
  } catch(e){
    return {"error": e}
  }
}

async function deleteTask(dtoIn){
  try{
    const { id } = dtoIn
    if (!id||id.length==0){
      throw new Error("wrong id")
    }
    const task = await prisma.task.delete({
      where: {
        id: Number(id),
      },
    })
    return task
  } catch(e){
    return {"error": e}
  }
}

async function updateTaskStatus(dtoIn){
  try{
    const { id,newStatus } = dtoIn
    if (!id||id.length==0){
      throw new Error("wrong id")
    }
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        status: Number(newStatus),
      },
    })
    return task
  } catch(e){
    return {"error": e}
  }
}

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

app.post(`/role`, async (req, res) => {
  const dtoOut = await createRole(req.body)
  res.json(dtoOut)
})

app.post(`/user`, async (req, res) => {
  const dtoOut = await createUser(req.body)
  res.json(dtoOut)
})

app.post(`/tasklist`, async (req, res) => {
  const dtoOut = await createTaskList(req.body)
  res.json(dtoOut)
})

app.get('/tasklists/:id', async (req, res) => {
  const dtoOut = await readTaskList(req.params)
  res.json(dtoOut)
})

app.get('/tasklists', async (req, res) => {
  const dtoOut = await readTaskLists()
  res.json(dtoOut)
})

app.post(`/task`, async (req, res) => {
  const dtoOut = await createTask(req.body)
  res.json(dtoOut)
})

app.delete('/task/:id', async (req, res) => {
  const dtoOut = await deleteTask(req.params)
  res.json(dtoOut)
})

app.put('/task/:id/status/:newStatus', async (req, res) => {
  const dtoOut = await updateTaskStatus(req.params)
  res.json(dtoOut)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
