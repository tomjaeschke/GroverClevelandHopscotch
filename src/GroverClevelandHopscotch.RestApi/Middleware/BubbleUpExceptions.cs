using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Rest;
namespace GroverClevelandHopscotch.RestApi.Middleware
{
    public class BubbleUpExceptions : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            context.Result = new JsonResult(context.Exception);
            if (context.Exception is ValidationException)
            {
                context.HttpContext.Response.StatusCode = (int) HttpStatusCode.NotAcceptable;
            }
            else
            {
                context.HttpContext.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
            }
        }
    }
}