package main

import (
	"context"
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/http"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/pawelataman/hello-word/internal/config"
	"github.com/pawelataman/hello-word/internal/db"
	"github.com/pawelataman/hello-word/internal/db/generated"
	"github.com/pawelataman/hello-word/internal/handlers"
	"github.com/pawelataman/hello-word/internal/middleware"
	"github.com/pawelataman/hello-word/internal/repository"
	"github.com/pawelataman/hello-word/internal/server"
	"github.com/pawelataman/hello-word/internal/services"
	"github.com/pawelataman/hello-word/internal/validation"
	"log"
	"os"
)

func main() {
	_ = godotenv.Load()
	ctx := context.Background()

	appConfig := config.NewAppConfig(config.WithDSN(os.Getenv("DB_URL"), os.Getenv("DB_NAME")), config.WithMaxConnections(4))

	pool, err := db.CreateDbConnection(ctx, appConfig)
	queries := generated.New(pool)
	transactionManager := db.NewTransactionManager(pool)

	if err != nil {
		log.Fatal("could not init db connection", err)
		return
	}

	app, err := Setup(transactionManager, queries)

	if err != nil {
		log.Fatal(err.Error())
		return
	}
	defer func() {
		db.DisposeConnection(pool)
	}()

	log.Println("Server is listening on port :8080")
	log.Fatal(app.Listen(":8080"))
}

func Setup(tm db.ITransactionManager, queries *generated.Queries) (*server.Server, error) {

	validation.InitTranslator()
	clerk.SetKey(os.Getenv("CLERK_SECRET_KEY"))

	app := server.New()
	app.Use(logger.New())
	app.Use(middleware.HandleErrorMiddleware)
	app.Use(adaptor.HTTPMiddleware(http.WithHeaderAuthorization()))
	app.Use(middleware.AuthMiddleware)

	quizRepository := repository.NewQuizRepository(queries)
	flashcardsRepository := repository.NewFlashcardsRepository(queries)
	wordsRepository := repository.NewWordsRepository(queries)

	services.QuizService = services.NewQuizServiceImpl(&services.QuizServiceParams{
		QuizRepository:      quizRepository,
		Transactioner:       tm,
		FlashcardRepository: flashcardsRepository,
	})
	services.WordsService = services.NewWordsService(&services.WordServiceParams{
		Repository:    wordsRepository,
		FlashcardRepo: flashcardsRepository,
		Transactioner: tm,
	})
	services.FlashcardService = services.NewFlashcardService(&services.FlashcardServiceParams{
		Transactioner: tm,
		Repository:    flashcardsRepository,
	})

	handlers.RegisterDictionaryHandler(app)
	handlers.RegisterQuizHandlers(app)
	handlers.RegisterFlashcardsHandler(app)

	return app, nil
}
