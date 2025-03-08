package validation

import (
	"errors"
	"github.com/go-playground/validator/v10"
	"github.com/iancoleman/strcase"
)

var structValidator = validator.New(validator.WithRequiredStructEnabled())

func ValidateStruct(obj interface{}) (map[string]string, bool) {
	err := structValidator.Struct(obj)

	if err != nil {
		var validationErrors validator.ValidationErrors
		errors.As(err, &validationErrors)

		errorMap := make(map[string]string)

		for _, validationError := range validationErrors {
			errorMap[strcase.ToLowerCamel(validationError.Field())] = validationError.Translate(structValidationTranslator)
		}
		return errorMap, false
	}

	return nil, true
}
