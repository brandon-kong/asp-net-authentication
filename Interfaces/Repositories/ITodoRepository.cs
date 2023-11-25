using project.Models;

namespace project.Interfaces.Repositories {
    public interface ITodoRepository {
        bool TodoExists (int id);
        Todo? GetTodoById(int id);
        List<Todo> GetTodos();
        void AddTodo (Todo todo);
    }
}