const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
const port = 80

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

app.post(`/tasklist`, async (req, res) => {
  const dtoOut = await createTaskList(req.body)
  res.json(dtoOut)
})

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
    return taskList
  } catch(e){
    return {"error": e}
  }
}

app.get('/tasklists/:id', async (req, res) => {
  const dtoOut = await readTaskList(req.params)
  res.json(dtoOut)
})

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
app.delete('/task/:id', async (req, res) => {
  const dtoOut = await deleteTask(req.params)
  res.json(dtoOut)
})

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

app.put('/task/:id/status/:newStatus', async (req, res) => {
  const dtoOut = await updateTaskStatus(req.params)
  res.json(dtoOut)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
