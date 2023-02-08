const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
    date: new Date(),
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
    date: new Date(),
  },
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const noteInDb = async () => {
  const note = await Note.find({})
  return note.map((note) => note.toJSON())
}

const userInDb = async () => {
  const user = await User.find({})
  return user.map((user) => user.toJSON())
}

module.exports = { initialNotes, nonExistingId, noteInDb, userInDb }
