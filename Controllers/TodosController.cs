using Microsoft.AspNetCore.Mvc;
using project.Filters;
using project.Models;
using project.Models.Repositories;

namespace project.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class TodosController(TodoRepository todoRepository) : ControllerBase {

        private readonly TodoRepository TodoRepository = todoRepository;

        [HttpGet]
        public IActionResult GetTodo() {
            return Ok(TodoRepository.GetTodos());
        }


        [HttpGet("{id}")]
        [Todo_ValidateTodoIdFilter]
        public IActionResult GetTodoById(int id) {

            return Ok(TodoRepository.GetTodoById(id));
        }


        [HttpPost]
        public IActionResult CreateTodo([FromBody] Todo todo) {

            bool todoExists = TodoRepository.TodoExists(todo.TodoId);

            if (todoExists) {
                return BadRequest();
            }

            TodoRepository.AddTodo(todo);

            return CreatedAtAction(nameof(GetTodoById), new { id = todo.TodoId }, todo);
        }


        [HttpPut("{id}")]
        public string UpdateTodo(int id) {
            return $"Updating todo with id: {id}";
        }


        [HttpDelete("{id}")]
        public string DeleteTodo(int id) {
            return $"Deleting todo with id: {id}";
        }
    }
}