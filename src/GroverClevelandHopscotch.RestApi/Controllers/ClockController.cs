using GroverClevelandHopscotch.Core.Interfaces;
using GroverClevelandHopscotch.Core.Objects;
using Microsoft.AspNetCore.Mvc;
namespace GroverClevelandHopscotch.RestApi.Controllers
{
    [Route("api/clock")]
    public class ClockController : Controller
    {
        public IClockMechanics _clockMechanics;

        public ClockController(IClockMechanics clockMechanics)
        {
            _clockMechanics = clockMechanics;
        }

        [HttpGet]
        public TimeMessage Get()
        {
            TimeMessage timeMessage = new TimeMessage(_clockMechanics);
            return timeMessage;
        }
    }
}