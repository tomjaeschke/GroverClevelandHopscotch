using System;
using GroverClevelandHopscotch.Core.Interfaces;
namespace GroverClevelandHopscotch.Core.Tests.Interfaces
{
    public class ClockMechanicsDinnerStub : IClockMechanics
    {
        public DateTime GetTime()
        {
            return new DateTime(2017,11,23,20,6,7);
        }
    }
}