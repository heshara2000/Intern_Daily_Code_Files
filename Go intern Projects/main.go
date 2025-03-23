package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"sync"

	"github.com/gorilla/mux"
)

type Book struct {
	BookID          string  `json:"bookId"`
	AuthorID        string  `json:"authorId"`
	PublisherID     string  `json:"publisherId"`
	Title           string  `json:"title"`
	PublicationDate string  `json:"publicationDate"`
	ISBN            string  `json:"isbn"`
	Pages           int     `json:"pages"`
	Genre           string  `json:"genre"`
	Description     string  `json:"description"`
	Price           float64 `json:"price"`
	Quantity        int     `json:"quantity"`
}

var books []Book

func getBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

func getBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	for _, item := range books {
		if item.BookID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Book{})
}

func createBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var book Book
	_ = json.NewDecoder(r.Body).Decode(&book)
	book.BookID = strconv.Itoa(rand.Intn(1000000))
	books = append(books, book)
	json.NewEncoder(w).Encode(book)
}

func updateBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	for index, item := range books {
		if item.BookID == params["id"] {
			books = append(books[:index], books[index+1:]...)
			var book Book
			_ = json.NewDecoder(r.Body).Decode(&book)
			book.BookID = params["id"]
			books = append(books, book)
			json.NewEncoder(w).Encode(book)
			return
		}
	}
	json.NewEncoder(w).Encode(books)
}

func deleteBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	for index, item := range books {
		if item.BookID == params["id"] {
			books = append(books[:index], books[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(books)
}

// Function to perform search on a subset of books
func searchSubset(booksSubset []Book, query string, resultsChan chan<- Book, wg *sync.WaitGroup) {
	defer wg.Done()
	for _, item := range booksSubset {
		if strings.Contains(strings.ToLower(item.Title), strings.ToLower(query)) ||
			strings.Contains(strings.ToLower(item.Description), strings.ToLower(query)) {
			resultsChan <- item // Send matching books to channel
		}
	}
}



func searchBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	query := r.URL.Query().Get("q")

	// if query == "" {
	// 	json.NewDecoder(w).Encode([]Book{})
	// 	return
	// }
	if query == "" {
        http.Error(w, "Query parameter 'q' is missing", http.StatusBadRequest)
        return
    }

	resultsChan := make(chan Book,len(books))
	var wg sync.WaitGroup

	// Split the books slice into 4 subsets
	numGoroutines := 4
	chunkSize := (len(books) + numGoroutines - 1) / numGoroutines

	// Split books into chunks and search in parallel
	for i := 0; i < len(books); i += chunkSize {
		end := i + chunkSize
		if end > len(books) {
			end = len(books)
		}
		wg.Add(1)
		go searchSubset(books[i:end], query, resultsChan, &wg)
	}

	// Close the channel once all goroutines are done
	go func() {
		wg.Wait()
		close(resultsChan)
	}()


	// Collect results from the channel
	var result []Book
	for book := range resultsChan {
		result = append(result, book)
	}

	// for _, item := range books {
	// 	if strings.Contains(strings.ToLower(item.Title), strings.ToLower(query)) || 
    //        strings.Contains(strings.ToLower(item.Description), strings.ToLower(query)) {
    //         result = append(result, item)
    //     }
	// }
	json.NewEncoder(w).Encode(result)
}


func main() {
	r := mux.NewRouter()

	books = append(books, Book{BookID: "bb329a31-6b1e-4daa-87ee-71631aa05866", AuthorID: "e0d91f68-a183-477d-8aa4-1f44ccc78a70", PublisherID: "2f7b19e9-b268-4440-a15b-bed8177ed607", Title: "The Alchemist", PublicationDate: "1988-01-01", ISBN: "978-0-06-231500-7", Pages: 208, Genre: "Fiction", Description: "Set in the 1920s, this classic novel exploresthemes of wealth, love, and the American Dream.", Price: 10.99, Quantity: 100})
	books = append(books, Book{
		BookID:          "b763a45d-7f1e-2da4-47de-19344ab23870",
		AuthorID:        "d2a91f78-c153-488d-7b23-2f55bbb78a92",
		PublisherID:     "1e9a19d9-a321-4689-a25b-cbd8478ed506",
		Title:           "Game of the Thrones",
		PublicationDate: "1949-06-08",
		ISBN:            "978-0-452-28423-4",
		Pages:           328,
		Genre:           "Dystopian",
		Description:     "A dystopian novel set in a totalitarian society ruled by Big Brother, exploring themes of surveillance and censorship.",
		Price:           12.50,
		Quantity:        75,
	})

	books = append(books, Book{
		BookID:          "c234d45f-9c8e-4dbf-57cd-63712ec38291",
		AuthorID:        "c9f81a78-e223-498d-9c34-7d54cdc98a73",
		PublisherID:     "5c7a39d9-d128-4838-b15a-bde8172ed607",
		Title:           "Pride and Prejudice",
		PublicationDate: "1813-01-28",
		ISBN:            "978-0-19-280238-5",
		Pages:           279,
		Genre:           "Romance",
		Description:     "A romantic novel that explores issues of marriage, morality, and the societal expectations of 19th century England.",
		Price:           9.99,
		Quantity:        30,
	})

	r.HandleFunc("/books", getBooks).Methods("GET")
	r.HandleFunc("/books/{id}", getBook).Methods("GET")
	r.HandleFunc("/books", createBook).Methods("POST")
	r.HandleFunc("/books/{id}", updateBook).Methods("PUT")
	r.HandleFunc("/books/{id}", deleteBook).Methods("DELETE")
	r.HandleFunc("/books/search", searchBooks).Methods("GET")


	fmt.Printf("Starting server at port 8080\n")
	log.Fatal(http.ListenAndServe(":8080", r))
}
