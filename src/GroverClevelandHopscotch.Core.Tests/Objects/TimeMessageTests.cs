using GroverClevelandHopscotch.Core.Objects;
using GroverClevelandHopscotch.Core.Tests.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace GroverClevelandHopscotch.Core.Tests.Objects
{
    [TestClass]
    public class TimeMessageTests
    {
        [TestMethod]
        public void TimeMessage_at_breakfast_as_expected()
        {
            //Arrange
            ClockMechanicsBreakfastStub clockMechanicsdBreakfastStub = new ClockMechanicsBreakfastStub();

            //Act
            TimeMessage timeMessage = new TimeMessage(clockMechanicsdBreakfastStub);

            //Assert
            Assert.AreEqual(timeMessage.FriendlyFormatTime, "15 past 7 in the ante meridiem on August, 22nd of 2003");
        }

        [TestMethod]
        public void TimeMessage_at_lunch_as_expected()
        {
            //Arrange
            ClockMechanicsLunchStub clockMechanicsdLunchStub = new ClockMechanicsLunchStub();

            //Act
            TimeMessage timeMessage = new TimeMessage(clockMechanicsdLunchStub);

            //Assert
            Assert.AreEqual(timeMessage.FriendlyFormatTime, "0 past noon on February, 29th of 1996");
        }

        [TestMethod]
        public void TimeMessage_at_dinner_as_expected()
        {
            //Arrange
            ClockMechanicsDinnerStub clockMechanicsdDinnerStub = new ClockMechanicsDinnerStub();

            //Act
            TimeMessage timeMessage = new TimeMessage(clockMechanicsdDinnerStub);

            //Assert
            Assert.AreEqual(timeMessage.FriendlyFormatTime, "6 past 8 in the post meridiem on November, 23rd of 2017");
        }
    }
}