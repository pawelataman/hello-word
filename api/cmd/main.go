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
	initClerk()

	app := server.New()
	app.Use(logger.New())

	app.Use(adaptor.HTTPMiddleware(http.WithHeaderAuthorization()))
	app.Use(middleware.AuthMiddleware)

	handlers.RegisterQuizHandlers(app)

	log.Println("Server is listening on port :3000")
	log.Fatal(app.Listen(":3000"))
}

func initServices() {
	services.QuizService = services.NewQuizServiceImpl()
}

func initClerk() {
	clerk.SetKey(os.Getenv("CLERK_SECRET_KEY"))
}

func dispose(ctx context.Context) {

	//dispose db connection
	if err := db.DisposeConnection(ctx); err != nil {
		log.Println("could not dispose db connection", err)
	}
}
