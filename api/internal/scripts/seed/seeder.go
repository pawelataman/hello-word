package seed

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/pawelataman/hello-word/internal/db/generated"
	"io"
	"log"
	"os"
)

type Seeder struct {
	queries *generated.Queries
}

func New(queries *generated.Queries) *Seeder {
	return &Seeder{
		queries: queries,
	}
}

func (s *Seeder) Seed(ctx context.Context) {
	seedWords(s.queries, ctx, "adjectives.json")
	seedWords(s.queries, ctx, "bike-related.json")
	seedWords(s.queries, ctx, "ordering.json")
	seedWords(s.queries, ctx, "rolki.json")
	seedWords(s.queries, ctx, "size-position.json")
}

func seedWords(queries *generated.Queries, ctx context.Context, source string) {
	var words []Word
	fmt.Println(fmt.Sprintf("read data from %s", fmt.Sprintf("./internal/scripts/seed/data/%s", source)))
	byteData := readData(fmt.Sprintf("./internal/scripts/seed/data/%s", source))
	if err := json.Unmarshal(byteData, &words); err != nil {
		fmt.Println(err)
		log.Fatalf("could not unmarshal word from json %s", source)
	}

	for i := 0; i < len(words); i++ {
		if wordExists(queries, ctx, words[i]) {
			fmt.Printf("word %d.%s %s", i, words[i].En, " already exists\n")
			continue
		}

		putWordParam := generated.AddWordParams{
			En:     words[i].En,
			Pl:     words[i].Pl,
			Author: "default",
		}
		if _, err := queries.AddWord(ctx, putWordParam); err != nil {
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

func wordExists(queries *generated.Queries, ctx context.Context, word Word) bool {
	_, err := queries.GetWordByEn(ctx, word.En)
	if err == nil {
		return true
	}
	_, err = queries.GetWordByPl(ctx, word.Pl)

	if err == nil {
		return true
	}

	return false
}
