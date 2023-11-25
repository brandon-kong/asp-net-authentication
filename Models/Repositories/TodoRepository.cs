using Microsoft.EntityFrameworkCore;
using project.Data;

namespace project.Models.Repositories {
    
    public class TodoRepository {

        private static DataContext _context;

        public TodoRepository(DataContext context) {
            _context = context;
        }

        public static bool TodoExists (int id) {
            var todo = _context.Todo.Find(id);
            return todo != null;
        }

        public static Todo? GetTodoById(int id) {
            return _context.Todo.Find(id);
        }

        public static List<Todo> GetTodos() {
            return _context.Todo.ToList();
        }

        public static void AddTodo(Todo todo) {
            _context.Todo.Add(todo);
            _context.SaveChanges();
        }
    }
    
}