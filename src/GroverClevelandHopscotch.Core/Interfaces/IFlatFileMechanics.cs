using System.Collections.Generic;
using GroverClevelandHopscotch.Core.Objects;
namespace GroverClevelandHopscotch.Core.Interfaces
{
    public interface IFlatFileMechanics
    {
        void DeletePresident(string id);
        List<President> GetPresidents();
        void SetPresidents(List<President> list);
    }
}