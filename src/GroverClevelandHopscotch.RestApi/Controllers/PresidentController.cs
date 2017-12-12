using System.Collections.Generic;
using GroverClevelandHopscotch.Core.Interfaces;
using GroverClevelandHopscotch.Core.Objects;
using Microsoft.AspNetCore.Mvc;
namespace GroverClevelandHopscotch.RestApi.Controllers
{
    [Route("api/President")]
    public class PresidentController : Controller
    {
        public IFlatFileMechanics _flatFileMechanics;

        public PresidentController(IFlatFileMechanics flatFileMechanics)
        {
            _flatFileMechanics = flatFileMechanics;
        }

        [HttpGet]
        public ObjectResult Get()
        {
            return Ok(_flatFileMechanics.GetPresidents());
        }
        
        [HttpPut]
        public ObjectResult Put([FromBody] List<President> presidents)
        {
            _flatFileMechanics.SetPresidents(presidents);
            return Ok(null);
        }
    }
}