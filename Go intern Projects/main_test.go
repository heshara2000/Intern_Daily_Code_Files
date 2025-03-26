package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)


func TestGetBooks(t *testing.T) {

	// Create a request to pass to our handler. We don't have any query parameters for now, so we'll pass 'nil' as the third parameter.
	req, err := http.NewRequest("GET", "/books", nil)
	if err != nil {
		t.Fatal(err)
	}

	//response recorder

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(getBooks)

	handler.ServeHTTP(rr, req)

	// Check the status code is what we expect.

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	

	// Check the response body is what we expect.
	expected := []Book{}
	var actual []Book
	if err := json.Unmarshal(rr.Body.Bytes(), &actual); err != nil {
		t.Fatalf("unable to parse response body: %v", err)
	}
	if len(actual) != len(expected) {
		t.Errorf("handler returned unexpected body: got %v want %v",
			actual, expected)
	}
}