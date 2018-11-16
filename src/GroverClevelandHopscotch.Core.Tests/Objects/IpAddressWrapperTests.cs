using GroverClevelandHopscotch.Core.Interfaces;
using GroverClevelandHopscotch.Core.Objects;
using GroverClevelandHopscotch.Core.Tests.Interfaces;
using Moq;
using Xunit;

namespace GroverClevelandHopscotch.Core.Tests.Objects
{
    public class IpAddressWrapperTests
    {
        [Fact]
        public void IpAddressWrapper_constructor_behaves_as_expected()
        {
            //Arrange
            Mock<IIpMechanics> ipMechanicsMock = new Mock<IIpMechanics>();
            ipMechanicsMock.Setup(ip => ip.GetIpAddress()).Returns("127.0.0.1");

            //Act
            IpAddressWrapper ipAddressWrapper = new IpAddressWrapper(ipMechanicsMock.Object);

            //Assert
            Assert.Equal(ipAddressWrapper.Ip, "127.0.0.1");
        }

        [Fact]
        public void IpAddressWrapper_compensates_for_an_exception_as_expected()
        {
            //Arrange
            IpMechanicsStub ipMechanicsStub = new IpMechanicsStub();

            //Act
            IpAddressWrapper ipAddressWrapper = new IpAddressWrapper(ipMechanicsStub);

            //Assert
            Assert.Equal(ipAddressWrapper.Ip, "");
        }
    }
}