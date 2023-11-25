using Microsoft.EntityFrameworkCore;
using project.Data;
using project.Interfaces.Repositories;

namespace project.Models.Repositories {
    
    public class TodoRepository : ITodoRepository {

        private static DataContext _context;

        public TodoRepository(DataContext context) {
            _context = context;
        }

        public  bool TodoExists (int id) {
            var todo = _context.Todo.Find(id);
            return todo != null;
        }

        public  Todo? GetTodoById(int id) {
            return _context.Todo.Find(id);
        }

        public  List<Todo> GetTodos() {
            return _context.Todo.ToList();
        }

        public  void AddTodo(Todo todo) {
            _context.Todo.Add(todo);
            _context.SaveChanges();
        }
    }
    
}