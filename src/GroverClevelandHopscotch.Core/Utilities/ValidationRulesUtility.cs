using GroverClevelandHopscotch.Core.Objects;
namespace GroverClevelandHopscotch.Core.Utilities
{
    public static class ValidationRulesUtility
    {
        public static ValidationRules GetRules()
        {
            return new ValidationRules()
            {
                ErrorMessageForName = "A person's name may only contain letters, spaces, single quotes, hyphens, and periods and moreover cannot be a duplicate or left blank.",
                ErrorMessageForParty = "A party name may only contain letters and spaces or, alternatively, it may be left blank.",
                PresidentialNameValidationRule = @"^([A-Za-z\.'-]+[\s]*)+$",
                PresidentialPartyValidationRule = @"^([A-Za-z]+[\s]*)*$"
            };
        }
    }
}