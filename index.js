const express = require('express');
const server = express();

// Alternative Option to count Requisitons on api
// let NumberOfRequisitions = 0;
// server.use((req, res, next) => {
//   NumberOfRequisitions = NumberOfRequisitions + 1;
//   console.log(`NumberOfRequisitions: ${NumberOfRequisitions}`)
//   next();
// })

const projects = []
server.use(express.json())

function logRequests(req, res, next) {
  console.count("Número de requisiçoes");
  return next();
}

server.use(logRequests);

function idValidation(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id)
  if (project) {
    next();
  } else {
    return res.status(400).json({ error: "Id not found!" })
  }
}

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project)
  return res.json(projects)

});
server.get('/projects', (req, res) => {
  return res.json(projects)
});
server.put('/projects/:id', idValidation, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  let project=projects.find(p => p.id == id)
  
  project.title = title;

  return res.json(projects)
});
server.delete('/projects/:id', idValidation, (req, res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  projects.splice(project, 1);

  return res.send();

})
server.post('/projects/:id/tasks', idValidation, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);

})
server.listen(3000);