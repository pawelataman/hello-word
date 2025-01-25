package api_errors

import "github.com/gofiber/fiber/v2"

type ApiError struct {
	StatusCode int `json:"statusCode"`
	Message    any `json:"message"`
}

func (e ApiError) Error() string {
	return ""
}

func NewApiErr(statusCode int, err error) ApiError {
	return ApiError{
		StatusCode: statusCode,
		Message:    err.Error(),
	}
}

func InvalidReqDataErr(errors map[string]string) ApiError {
	return ApiError{
		Message:    errors,
		StatusCode: fiber.StatusUnprocessableEntity,
	}
}

func EntityExistsErr(message string) ApiError {
	return ApiError{
		StatusCode: fiber.StatusConflict,
		Message:    message,
	}
}
