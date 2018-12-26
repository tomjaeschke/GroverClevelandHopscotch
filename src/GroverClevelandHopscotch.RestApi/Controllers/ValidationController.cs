using GroverClevelandHopscotch.Core.Objects;
using GroverClevelandHopscotch.Core.Utilities;
using Microsoft.AspNetCore.Mvc;
namespace GroverClevelandHopscotch.RestApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Validation")]
    public class ValidationController : Controller
    {
        [HttpGet]
        public ValidationRules Get()
        {
            return ValidationRulesUtility.GetRules();
        }
    }
}