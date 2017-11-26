using System;
using GroverClevelandHopscotch.Core.Interfaces;
namespace GroverClevelandHopscotch.Core.Tests.Interfaces
{
    public class ClockMechanicsLunchStub : IClockMechanics
    {
        public DateTime GetTime()
        {
            return new DateTime(1996,2,29,12,00,00);
        }
    }
}