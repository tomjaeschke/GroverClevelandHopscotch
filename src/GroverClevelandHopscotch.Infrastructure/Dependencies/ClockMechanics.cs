using System;
using GroverClevelandHopscotch.Core.Interfaces;
namespace GroverClevelandHopscotch.Infrastructure.Dependencies
{
    public class ClockMechanics : IClockMechanics
    {
        public DateTime GetTime()
        {
            return DateTime.UtcNow;
        }
    }
}