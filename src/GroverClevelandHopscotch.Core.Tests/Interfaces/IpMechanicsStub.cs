using System;
using GroverClevelandHopscotch.Core.Interfaces;
namespace GroverClevelandHopscotch.Core.Tests.Interfaces
{
    public class IpMechanicsStub : IIpMechanics
    {
        public string GetIpAddress()
        {
            throw new Exception("simulated failure");
        }
    }
}