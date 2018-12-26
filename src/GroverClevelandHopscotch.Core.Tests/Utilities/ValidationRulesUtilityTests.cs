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
            ValidationRules validationRules = ValidationRulesUtility.GetRules();
            Assert.Equal(validationRules.ErrorMessageForName, "A person's name may only contain letters, spaces, single quotes, hyphens, and periods and moreover cannot be a duplicate or left blank.");
            Assert.Equal(validationRules.ErrorMessageForParty, "A party name may only contain letters and spaces or, alternatively, it may be left blank.");
            Assert.Equal(validationRules.PresidentialNameValidationRule, "^([A-Za-z\\.'-]+[\\s]*)+$");
            Assert.Equal(validationRules.PresidentialPartyValidationRule, "^([A-Za-z]+[\\s]*)*$");
        }
    }
}
