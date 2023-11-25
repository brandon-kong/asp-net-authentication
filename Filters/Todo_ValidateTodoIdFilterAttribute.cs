using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using project.Models;
using project.Models.Repositories;

namespace project.Filters {
    public class Todo_ValidateTodoIdFilterAttribute: ActionFilterAttribute {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var todoId = context.ActionArguments["id"] as int?;
            if (todoId.HasValue) {
                if (todoId.Value <= 0) {
                    context.ModelState.AddModelError("TodoId", "TodoId is invalid");
                    var problemDetails = new ValidationProblemDetails(context.ModelState) {
                        Status = StatusCodes.Status400BadRequest
                    };
                    context.Result = new BadRequestObjectResult(problemDetails);
                }

                
                else if ( !TodoRepository.TodoExists(todoId.Value) && context.HttpContext.Request.Method != "POST" ) {
                    context.ModelState.AddModelError("TodoId", "Todo item does not exist");
                    var problemDetails = new ValidationProblemDetails(context.ModelState) {
                        Status = StatusCodes.Status404NotFound
                    };
                    context.Result = new NotFoundObjectResult(problemDetails);
                }
            }
        }
    }
}