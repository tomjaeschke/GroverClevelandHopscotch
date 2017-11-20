using GroverClevelandHopscotch.Core.Interfaces;
using GroverClevelandHopscotch.Core.Objects;
using Microsoft.AspNetCore.Mvc;
namespace GroverClevelandHopscotch.RestApi.Controllers
{
    [Route("api/ip")]
    public class IpController : Controller
    {
        public IIpMechanics _ipMechanics;

        public IpController(IIpMechanics ipMechanics)
        {
            _ipMechanics = ipMechanics;
        }

        [HttpGet]
        public ObjectResult Get()
        {
            IpAddressWrapper ipAddressWrapper = new IpAddressWrapper(_ipMechanics);
            return Ok(ipAddressWrapper);
        }
    }
}