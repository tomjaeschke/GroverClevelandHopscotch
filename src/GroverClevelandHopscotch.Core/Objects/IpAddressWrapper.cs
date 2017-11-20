using GroverClevelandHopscotch.Core.Interfaces;
namespace GroverClevelandHopscotch.Core.Objects
{
    public class IpAddressWrapper
    {
        public string Ip { get; set; }

        public IpAddressWrapper(IIpMechanics ipMechanics)
        {
            Ip = ipMechanics.GetIpAddress();
        }
    }
}