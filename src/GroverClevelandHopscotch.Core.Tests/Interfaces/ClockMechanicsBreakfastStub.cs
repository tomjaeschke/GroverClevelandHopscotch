using System;
using GroverClevelandHopscotch.Core.Interfaces;
namespace GroverClevelandHopscotch.Core.Tests.Interfaces
{
    public class ClockMechanicsBreakfastStub : IClockMechanics
    {
        public DateTime GetTime()
        {
            return new DateTime(2003, 8, 22, 7, 15, 39);
        }
    }
}