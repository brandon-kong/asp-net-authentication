using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using project.Models;
using project.Models.Repositories;

namespace project.Filters {
    public class Todo_ValidateTodoIdFilterAttribute: ActionFilterAttribute {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            
        }
    }
}