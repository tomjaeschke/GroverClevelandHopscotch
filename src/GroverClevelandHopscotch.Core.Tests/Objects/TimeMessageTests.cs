using GroverClevelandHopscotch.Core.Objects;
using GroverClevelandHopscotch.Core.Tests.Interfaces;
using Xunit;

namespace GroverClevelandHopscotch.Core.Tests.Objects
{
    public class TimeMessageTests
    {
        [Fact]
        public void TimeMessage_at_breakfast_as_expected()
        {
            //Arrange
            ClockMechanicsBreakfastStub clockMechanicsdBreakfastStub = new ClockMechanicsBreakfastStub();

            //Act
            TimeMessage timeMessage = new TimeMessage(clockMechanicsdBreakfastStub);

            //Assert
            Assert.Equal(timeMessage.FriendlyFormatTime, "15 past 7 in the ante meridiem on August, 22nd of 2003");
        }

        [Fact]
        public void TimeMessage_at_lunch_as_expected()
        {
            //Arrange
            ClockMechanicsLunchStub clockMechanicsdLunchStub = new ClockMechanicsLunchStub();

            //Act
            TimeMessage timeMessage = new TimeMessage(clockMechanicsdLunchStub);

            //Assert
            Assert.Equal(timeMessage.FriendlyFormatTime, "0 past noon on February, 29th of 1996");
        }

        [Fact]
        public void TimeMessage_at_dinner_as_expected()
        {
            //Arrange
            ClockMechanicsDinnerStub clockMechanicsdDinnerStub = new ClockMechanicsDinnerStub();

            //Act
            TimeMessage timeMessage = new TimeMessage(clockMechanicsdDinnerStub);

            //Assert
            Assert.Equal(timeMessage.FriendlyFormatTime, "6 past 8 in the post meridiem on November, 23rd of 2017");
        }
    }
}