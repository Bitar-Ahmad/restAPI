const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server.js');
const {Todo} = require('./../models/todo');

const todos = [{
  _id:new ObjectID(),
  text: 'first test todo',
  comleted:false,
  completedAt:222
}, {
  _id:new ObjectID(),
  text: 'Second test todo',
  completed:false,
  completedAt:333
}];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => {
    done();
  });
});


describe('POST / todos', () => {
  it('Should create a new todo' , (done) => {
    const text = 'Test todo text';

    request(app).post('/todos').send({text}).expect(200).expect((res) => {
      expect(res.body.text).toBe(text);
    }).end((err, res) => {
      if (err) {return done(err)};

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((err) => {
        done(err)
      });
    });

  });

  it('Should not create todo with invalid data', (done) => {
    request(app).post('/todos').send({}).expect(400).end((err, res) => {
      if (err) {return done(err)};
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
});


describe('Get /todos ' , () => {
  it('Should get all todos' , (done) => {
    request(app).get('/todos').expect(200).expect((res) => {
      expect(res.body.todos.length).toBe(2);
    }).end(done);

  });
});



describe('GET / todos:id', () => {
  it ('Should return todo doc', (done) => {
    request(app).get(`/todos/${todos[0]._id.toHexString()}`).expect(200).expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    }).end(done);
  });


  it('Should return 404 if todo not found' , (done) => {
    const hexID = new ObjectID().toHexString();
    request(app).get(`/todos/${hexID}`).expect(404).end(done);
  });


  it('Should return 404 for non-object ids' , (done) => {
    request(app).get(`/todos/id213`).expect(404).end(done);
  });
});



describe('DELETE /todos/:id', () => {
  // it('Should remove a todo', (done) => {
  //   const hexID = todos[1]._id.toHexString();
  //
  //   request(app).delete(`/todos/${hexID}`).expect(200).expect((res) => {
  //     expect(res.body.todo._id).toBe(hexID);
  //   }).end((err, res) => {
  //     if (err) {return done(err)};
  //
  //     Todo.findById(hexID).then((todo) => {
  //       expect(todo).not.toBeTruthy();
  //       done();
  //     }).catch((err) => done(err));
  //   });
  // });
  //
  //
  // it('Should return 404 if todo not found', (done) => {
  //   const hexID = new ObjectID().toHexString();
  //   request(app).get(`/todos/${hexID}`).expect(404).end(done);
  // });
  //
  //
  // it('Should return 404 if id is invalid', (done) => {
  //     request(app).get(`/todos/id213`).expect(404).end(done);
  // });


  it('Should remove a todo', (done) => {
    const hexID = todos[0]._id.toHexString();
    request(app).delete(`/todos/${hexID}`).expect(200).expect((res) => {
      expect(res.body.todo._id).toBe(hexID);
    }).end((err, res) => {
      if (err) {return done(err)};
      Todo.findById(hexID).then((todo) => {
        expect(todo).not.toBeTruthy();
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  it('Should return 404 if todo not found', (done) => {
    const id = new ObjectID().toHexString();
    // const hexID = todos[0]._id.toHexString();

    request(app).delete(`/todos/${id}`).expect(404).end(done);
  });
  it('Should return 404 if id is invalid', (done) => {
    request(app).delete('/todos/1234').expect(404).end(done);
  });
});



describe('PATCH /todos:id', () => {
  it('Should update the todo', (done) => {
    const hexID = todos[1]._id.toHexString();
    const completed = true;
    const text = 'Hello there';

    request(app).patch(`/todos/${hexID}`).send({text, completed}).expect(200).expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(completed);
      expect(typeof res.body.todo.completedAt).toBe('number');
    }).end(done);
  });




  it('Should clear completedAt when todo is not completed', (done) => {
    const hexID = todos[0]._id.toHexString();
    const completed = true;
    const text = 'Hello there';

    request(app).patch(`/todos/${hexID}`).send({text, comleted:false}).expect(200).expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).not.toBeTruthy();
    }).end(done);
  });



})
