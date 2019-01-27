using System.Collections.Generic;
using GroverClevelandHopscotch.Core.Interfaces;
using GroverClevelandHopscotch.Core.Objects;
using GroverClevelandHopscotch.Core.Utilities;
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

        [HttpPut("{id}")]
        public void Put(string id, [FromBody] President president)
        {
            List<President> presidents = _flatFileMechanics.GetPresidents();
            ValidationRulesUtility.ValidateName(presidents, president.Name, id);
            ValidationRulesUtility.ValidateParty(president.Party);
            presidents.ForEach(p =>
            {
                if (id == p.Name)
                {
                    p.Name = president.Name;
                    p.Party = president.Party;
                    p.HasNonconsecutiveTerms = president.HasNonconsecutiveTerms;
                }
            });
            _flatFileMechanics.SetPresidents(presidents);
        }

        [HttpDelete]
        [Route("{id}")]
        public void Delete(string id)
        {
            _flatFileMechanics.DeletePresident(id);
        }
    }
}