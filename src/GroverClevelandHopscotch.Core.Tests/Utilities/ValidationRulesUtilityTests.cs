using System.Text.RegularExpressions;
using GroverClevelandHopscotch.Core.Objects;
using GroverClevelandHopscotch.Core.Utilities;
using Xunit;
namespace GroverClevelandHopscotch.Core.Tests.Utilities
{
    public class ValidationRulesUtilityTests
    {
        [Fact]
        public void ValidationRulesUtilities_behave_as_expected()
        {
            //arrange
            ValidationRules validationRules = ValidationRulesUtility.GetRules();
            var presidentialNameValidationRule = new Regex(validationRules.PresidentialNameValidationRule);
            var presidentialPartyValidationRule = new Regex(validationRules.PresidentialPartyValidationRule);
            var deadMouse = "deadmau5";
            var joelThomasZimmerman = "Joel Thomas Zimmerman";
            var misterZimmerman = "Mr. Zimmerman";

            //act
            Match deadMouseNameMatch = presidentialNameValidationRule.Match(deadMouse);
            Match deadMousePartyMatch = presidentialPartyValidationRule.Match(deadMouse);
            Match joelThomasZimmermanNameMatch = presidentialNameValidationRule.Match(joelThomasZimmerman);
            Match joelThomasZimmermanPartyMatch = presidentialPartyValidationRule.Match(joelThomasZimmerman);
            Match misterZimmermanNameMatch = presidentialNameValidationRule.Match(misterZimmerman);
            Match misterZimmermanPartyMatch = presidentialPartyValidationRule.Match(misterZimmerman);

            //assert
            Assert.Equal(deadMouseNameMatch.Success, false);
            Assert.Equal(deadMousePartyMatch.Success, false);
            Assert.Equal(joelThomasZimmermanNameMatch.Success, true);
            Assert.Equal(joelThomasZimmermanPartyMatch.Success, true);
            Assert.Equal(misterZimmermanNameMatch.Success, true);
            Assert.Equal(misterZimmermanPartyMatch.Success, false);
        }

        [Fact]
        public void ValidationRulesUtilities_disallows_empty_strings_when_applicable()
        {
            //arrange
            ValidationRules validationRules = ValidationRulesUtility.GetRules();
            var presidentialNameValidationRule = new Regex(validationRules.PresidentialNameValidationRule);
            var presidentialPartyValidationRule = new Regex(validationRules.PresidentialPartyValidationRule);
            var deadAir = "";

            //act
            Match deadAirNameMatch = presidentialNameValidationRule.Match(deadAir);
            Match deadAirPartyMatch = presidentialPartyValidationRule.Match(deadAir);

            //assert
            Assert.Equal(deadAirNameMatch.Success, false);
            Assert.Equal(deadAirPartyMatch.Success, true);
        }
    }
}