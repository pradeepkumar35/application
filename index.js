const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());

// app.use(morgan(":method :url :status :response-time ms - :req[body]"));
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/api/info", (request, response) => {
  const currentdatetime = new Date();
  console.log(currentdatetime);
  response.send(`<p>Phonebook has info for 2 people</p>${currentdatetime}`);
});
app.get("/api/persons", (request, response) => {
  console.log(persons);
  response.json(persons);
});
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
app.get("/api/notes", (request, response) => {
  response.json(notes);
});
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) response.json(person);
  else response.status(404).end();
});
app.get("/api/notes/:gg", (request, response) => {
  const id = Number(request.params.gg);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
const generateIdpersons = () => {
  const randomId = Math.floor(Math.random() * (10000 - 10 + 1) + 10);
  return randomId;
};
app.delete("/api/persons/delete/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.findIndex((person) => person.id === id);
  if (person !== -1) {
    persons.splice(person, 1);
    response.json(persons[person]);
  } else {
    response.status(404).end();
  }
});
app.post("/api/persons", (request, response) => {
  console.log(request.body);
  console.log(response.body);
  const body = request.body;
  const person = {
    name: body.content,
    number: body.important || false,
    id: generateIdpersons(),
  };
  let gg = persons.find((p) => p.name === person.name);
  console.log(typeof person);
  persons = persons.concat(person);
  request.body = person;
  response.json(person);

  // else {
  //   error = [
  //     {
  //       error: "name must be unique",
  //     },
  //   ];
  //   response.json(error);
  // }
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const http = require("http");

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);
