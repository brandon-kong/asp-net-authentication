using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project.Data;
using project.Filters;
using project.Interfaces.Repositories;
using project.Models;
using project.Models.Repositories;

namespace project.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase {

        private readonly DataContext dataContext;

        public TodosController(DataContext _dataContext) {
            dataContext = _dataContext;
        }

        [HttpGet]
        public IActionResult GetTodo() {
            return Ok(dataContext.Todo.OrderBy(todo => todo.TodoId).ToList());
        }

        
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}")]
        [Todo_ValidateTodoIdFilter]
        public IActionResult GetTodoById(int id) {
            var todo = dataContext.Todo.Find(id);

            if (todo == null) {
                return NotFound();
            }

            return Ok(todo);
        }


        [HttpPost]
        
        public IActionResult CreateTodo([FromBody] Todo todo) {

            bool todoExists = dataContext.Todo.Find(todo.TodoId) != null;

            if (todoExists) {
                return BadRequest();
            }

            dataContext.Todo.Add(todo);
            dataContext.SaveChanges();

            return CreatedAtAction(nameof(GetTodoById), new { id = todo.TodoId }, todo);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateTodo(int id, [FromBody] Todo todo) {
            var _todo = dataContext.Todo.Find(id);

            if (_todo == null) {
                return NotFound();
            }

            _todo.TodoBody = todo.TodoBody;
            _todo.TodoPriority = todo.TodoPriority;
            
            dataContext.SaveChanges();

            return Ok(_todo);
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id) {
            var todo = dataContext.Todo.Find(id);

            if (todo == null) {
                return NotFound();
            }
            
            dataContext.Todo.Remove(todo);
            dataContext.SaveChanges();

            return Ok();
        }
    }
}