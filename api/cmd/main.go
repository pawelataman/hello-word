package main

import (
	"context"
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/http"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/pawelataman/hello-word/internal/db"
	"github.com/pawelataman/hello-word/internal/handlers"
	"github.com/pawelataman/hello-word/internal/middleware"
	"github.com/pawelataman/hello-word/internal/server"
	"github.com/pawelataman/hello-word/internal/services"
	"github.com/pawelataman/hello-word/internal/validation"
	"log"
	"os"
)

func main() {
	_ = godotenv.Load()

	ctx := context.Background()

	if err := db.InitDbConnection(ctx); err != nil {
		log.Fatal("could not init db connection", err)
	}

	defer dispose(ctx)

	initServices()
	validation.InitTranslator()
	initClerk()

	app := server.New()

	app.Use(logger.New())
	app.Use(middleware.HandleErrorMiddleware)
	app.Use(adaptor.HTTPMiddleware(http.WithHeaderAuthorization()))

	if os.Getenv("SECURE_API") == "true" {
		app.Use(middleware.AuthMiddleware)
		log.Println("securing API with Clerk")
	}

	handlers.RegisterDictionaryHandler(app)
	handlers.RegisterQuizHandlers(app)

	log.Println("Server is listening on port :3000")
	log.Fatal(app.Listen(":3000"))
}

func initServices() {
	services.QuizService = services.NewQuizServiceImpl()
	services.DictionaryService = services.NewDictionaryServiceImpl()
}

func initClerk() {
	clerk.SetKey(os.Getenv("CLERK_SECRET_KEY"))
}

func dispose(ctx context.Context) {
	//dispose db pool
	db.DisposeConnection()
}
