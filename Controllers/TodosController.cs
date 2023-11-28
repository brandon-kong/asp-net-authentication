using System.Security.Claims;
using Azure;
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
    [Route("api/v1/[controller]")]
    public class TodosController : ControllerBase {

        private readonly DataContext dataContext;

        public TodosController(DataContext _dataContext) {
            dataContext = _dataContext;
        }

        [HttpGet]
        public IActionResult GetTodo() {
            return Ok(dataContext.Todo.OrderBy(todo => todo.TodoId).ToList());
        }

        
        [Authorize("ApiScope")]
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
        [Authorize("ApiScope")]
        public IActionResult CreateTodo([FromBody] Todo todo) {

            // get the user id from the access token
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // set the user id on the todo

            if (userId != null) {
                todo.UserId = userId;
            }

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
        [Authorize("ApiScope")]
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