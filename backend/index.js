const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
const port = 80

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post(`/role`, async (req, res) => {
  const { name } = req.body
  const result = await prisma.role.create({
    data: {
      name
    },
  })
  res.json(result)
})

app.get('/roles', async (req, res) => {
  const roles = await prisma.role.findMany()
  res.json(roles)
})

app.post(`/user`, async (req, res) => {
  const { name, surname, email, roleId } = req.body
  const result = await prisma.user.create({
    data: {
      name,
      surname,
      email,
      roleId
    },
  })
  res.json(result)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.post(`/tasklist`, async (req, res) => {
  const { name, description, creationDate, userId } = req.body
  const result = await prisma.taskList.create({
    data: {
      name,
      description,
      creationDate,
      userId
    },
  })
  res.json(result)
})

app.get('/tasklists', async (req, res) => {
  const tasklists = await prisma.taskList.findMany()
  res.json(tasklists)
})

app.post(`/task`, async (req, res) => {
  const { name, description, due, priority, status } = req.body
  const result = await prisma.task.create({
    data: {
      name,
      description,
      due,
      priority,
      status
    },
  })
  res.json(result)
})

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
