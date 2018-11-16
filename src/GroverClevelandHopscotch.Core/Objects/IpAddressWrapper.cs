using System;
using GroverClevelandHopscotch.Core.Interfaces;
namespace GroverClevelandHopscotch.Core.Objects
{
    public class IpAddressWrapper
    {
        public string Ip { get; set; }

        public IpAddressWrapper(IIpMechanics ipMechanics)
        {
            try
            {
                Ip = ipMechanics.GetIpAddress();
            }
            catch(Exception exception)
            {
                Ip = "";
            }
        }
    }
}