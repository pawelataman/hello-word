package validation

import (
	"fmt"
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	en_translations "github.com/go-playground/validator/v10/translations/en"
	"log"
)

var structValidationTranslator ut.Translator

func InitTranslator() {
	english := en.New()

	uniTranslator := ut.New(english, english)
	trans, found := uniTranslator.GetTranslator("en")

	if !found {
		log.Fatal(fmt.Errorf("could not find translations"))
	}
	structValidationTranslator = trans
	err := en_translations.RegisterDefaultTranslations(structValidator, structValidationTranslator)

	if err != nil {
		fmt.Println("could not register translation")
	}
}
