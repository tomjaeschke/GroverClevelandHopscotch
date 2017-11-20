using GroverClevelandHopscotch.Core.Objects;
using GroverClevelandHopscotch.Core.Tests.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace GroverClevelandHopscotch.Core.Tests.Objects
{
    [TestClass]
    public class IpAddressWrapperTests
    {
        [TestMethod]
        public void IpAddressWrapper_constructor_behaves_as_expected()
        {
            //Arrange
            IpMechanicsStub ipMechanicsStub = new IpMechanicsStub();

            //Act
            IpAddressWrapper ipAddressWrapper = new IpAddressWrapper(ipMechanicsStub);

            //Assert
            Assert.AreEqual(ipAddressWrapper.Ip,"127.0.0.1");
        }
    }
}