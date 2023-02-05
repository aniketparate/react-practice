const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app) // app.js is Express application, app is wraped into superagent object
const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})
  console.log('cleared')

  // it won't work cause forEach is a async function and beforeEach will not wait for it to respond since the await inside forEach is ment for that function only so the next test is called before finishing forEach response

  // helper.initialNotes.forEach(async (note) => {
  //   let noteObject = new Note(note)
  //   await noteObject.save()
  //   console.log('saved')
  // })
  // console.log('done')

  const noteObject = helper.initialNotes.map((note) => new Note(note))
  const promiseArray = noteObject.map((note) => note.save())
  const result = await Promise.all(promiseArray)
  console.log(result)
  // Promise.all method used to transform array of promises into a single promise
})

test('notes are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // 'Content-Type', 'application/json'
  // but actual header is application/json; charset=utf-8 therefore we use REGEX
}, 10000)

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  // execution gets here only after the HTTP request is complete
  // the result of HTTP request is saved in variable response
  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned note', async () => {
  const response = await api.get('/api/notes')

  const content = response.body.map((r) => r.content)
  expect(content).toContain('Browser can execute only JavaScript')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
    date: new Date(),
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.noteInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

  const content = notesAtEnd.map((note) => note.content)
  expect(content).toContain('async/await simplifies making async calls')
})

test('note without content is not added', async () => {
  const newNote = { important: true }

  await api.post('/api/notes').send(newNote).expect(400)

  const notesAtEnd = await helper.noteInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.noteInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultNote.body).toEqual(noteToView)
})

test('a note that can be deleted', async () => {
  const notesAtStart = await helper.noteInDb()
  const noteToDelete = notesAtStart[0]

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

  const notesAtEnd = await helper.noteInDb()

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

  const contents = notesAtEnd.map((r) => r.content)

  expect(contents).not.toContain(noteToDelete.content)
})

afterAll(async () => {
  await mongoose.connection.close()
})
