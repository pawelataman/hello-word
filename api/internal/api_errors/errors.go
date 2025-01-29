package api_errors

import "github.com/gofiber/fiber/v2"

type ApiError struct {
	Code    int `json:"code"`
	Message any `json:"message"`
}

func (e ApiError) Error() string {
	return ""
}

func NewApiErr(statusCode int, err error) ApiError {
	return ApiError{
		Code:    statusCode,
		Message: err.Error(),
	}
}

func InvalidReqDataErr(errors map[string]string) ApiError {
	return ApiError{
		Message: errors,
		Code:    fiber.StatusUnprocessableEntity,
	}
}

func EntityExistsErr(message string) ApiError {
	return ApiError{
		Code:    fiber.StatusConflict,
		Message: message,
	}
}
