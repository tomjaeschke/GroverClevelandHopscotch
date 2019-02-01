using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
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
            if (party != null)
            {
                ValidationRules validationRules = GetRules();
                bool hasSurvivedRegularExpressionMatching = (Regex.IsMatch(party, validationRules.PresidentialPartyValidationRule));
                if (!hasSurvivedRegularExpressionMatching)
                {
                    throw new ValidationException(validationRules.ErrorMessageForParty);
                }
            }
        }

        public static void ValidatePresidents(List<President> presidents)
        {
            string predecessor = "";
            ValidationRules validationRules = GetRules();
            foreach (President president in presidents.OrderBy(p => p.Name.ToLower().Trim()))
            {
                if (president.Name.ToLower().Trim() == predecessor.ToLower().Trim())
                {
                    throw new ValidationException(validationRules.ErrorMessageForName);
                }
                bool hasSurvivedRegularExpressionMatching = (Regex.IsMatch(president.Name, validationRules.PresidentialNameValidationRule));
                if (!hasSurvivedRegularExpressionMatching)
                {
                    throw new ValidationException(validationRules.ErrorMessageForName);
                }
                if (president.Party != null)
                {
                    hasSurvivedRegularExpressionMatching = (Regex.IsMatch(president.Party, validationRules.PresidentialPartyValidationRule));
                    if (!hasSurvivedRegularExpressionMatching)
                    {
                        throw new ValidationException(validationRules.ErrorMessageForParty);
                    }
                } 
                predecessor = president.Name;
            }
        }
    }
}