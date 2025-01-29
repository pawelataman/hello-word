package seed

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/pawelataman/hello-word/internal/db"
	"io"
	"log"
	"os"
)

type Seeder struct {
	queries *db.Queries
}

func New(queries *db.Queries) *Seeder {
	return &Seeder{
		queries: queries,
	}
}

func (s *Seeder) Seed(ctx context.Context) {
	seedWords(s.queries, ctx)
}

func seedWords(queries *db.Queries, ctx context.Context) {
	var words []Word
	byteData := readData("./internal/scripts/seed/data/words.json")
	if err := json.Unmarshal(byteData, &words); err != nil {
		fmt.Println(err)
		log.Fatal("could not unmarshal word from json")
	}
	for i := 0; i < len(words); i++ {
		putWordParam := db.AddWordParams{
			En:     words[i].En,
			Pl:     words[i].Pl,
			Author: "default",
		}
		if err := queries.AddWord(ctx, putWordParam); err != nil {
			fmt.Println("Could not insert record,", err)
		}
	}
}
func readData(path string) []byte {
	jsonFile, err := os.Open(path)
	if err != nil {
		fmt.Println("error", err)
	}
	defer func() {
		if err = jsonFile.Close(); err != nil {
			log.Fatal("could not close file", err)
		}
	}()

	byteValue, _ := io.ReadAll(jsonFile)

	return byteValue
}
