using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using GroverClevelandHopscotch.Core.Objects;
namespace GroverClevelandHopscotch.Core.Utilities
{
    public static class ValidationRulesUtility
    {
        public static ValidationRules GetRules()
        {
            return new ValidationRules()
            {
                ErrorMessageForName = "A person's name may only contain letters, spaces, single quotes, hyphens, and periods and moreover cannot be a duplicate or left blank. It should start with a letter.",
                ErrorMessageForParty = "A party name may only contain letters and spaces (but not just spaces or leading spaces) or, alternatively, it may be left blank.",
                PresidentialNameValidationRule = @"^([A-Za-z\.'-]+[\s]*)+$",
                PresidentialPartyValidationRule = @"^([A-Za-z]+[\s]*)*$"
            };
        }

        public static void ValidateName(List<President> presidents, string nameToBe, string preexistingName = null)
        {
            ValidationRules validationRules = GetRules();
            bool hasSurvivedRegularExpressionMatching = (Regex.IsMatch(nameToBe, validationRules.PresidentialNameValidationRule));
            if (!hasSurvivedRegularExpressionMatching)
            {
                throw new ValidationException(validationRules.ErrorMessageForName);
            }
            foreach (President president in presidents)
            {
                if (president.Name.ToLower().Trim() == nameToBe.ToLower().Trim() && nameToBe.ToLower().Trim() != (String.IsNullOrEmpty(preexistingName) ? null : preexistingName.ToLower().Trim()))
                {
                    throw new ValidationException(validationRules.ErrorMessageForName);
                }
            }
        }

        public static void ValidateParty(string party)
        {
            ValidationRules validationRules = GetRules();
            bool hasSurvivedRegularExpressionMatching = (Regex.IsMatch(party, validationRules.PresidentialPartyValidationRule));
            if (!hasSurvivedRegularExpressionMatching)
            {
                throw new ValidationException(validationRules.ErrorMessageForParty);
            }
        }
    }
}