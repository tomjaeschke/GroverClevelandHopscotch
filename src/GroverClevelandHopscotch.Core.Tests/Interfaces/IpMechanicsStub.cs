using GroverClevelandHopscotch.Core.Interfaces;
namespace GroverClevelandHopscotch.Core.Tests.Interfaces
{
    public class IpMechanicsStub : IIpMechanics
    {
        public string GetIpAddress()
        {
            return "127.0.0.1";
        }
    }
}