package main

import (
	//"booking-app/helper"
	"fmt"
	"sync"
	"time"
	//"strconv"
	//"strings"
)

const conferenceTickets int = 50
var remainingTickets uint = 50
var ConferenceName = "Go Conference"
var bookings = make([]userData, 0)

type userData struct {
	firstName string
	lastName string
	email string
	numberOfTickets uint

}

var wg = sync.WaitGroup{}

func main() {
	greetUsers()

	for {
		// Get user input
		firstName, lastName, email, userTickets := getUserInput()

		// Validate user input using the helper function
		isValidName, isValidEmail, isValidTickets := ValidateUserInput(firstName, lastName, email, userTickets)
		
		if isValidName && isValidEmail && isValidTickets {
			bookTickets(firstName, lastName, email, userTickets)
			wg.Add(1)
			go sendTickets(firstName, lastName, email)
			//go sendTickets(firstName, lastName, email, userTickets) 
			
			firstNames := getFirstNames()
			fmt.Printf("These are all the bookings: %v\n", firstNames)
			
			if remainingTickets == 0 {
				// End program when tickets are sold out
				fmt.Println("Our conference is fully booked. Come back next year!")
				break
			}
		} else {
			fmt.Println("Please enter valid details.")
			wg.Wait()
		}
	}
}

// Greet users with conference information
func greetUsers() {
	fmt.Printf("Welcome to %v booking application!\n", ConferenceName)
	fmt.Printf("We have a total of %v tickets and %v are still available.\n", conferenceTickets, remainingTickets)
}

// Get user input from the console
func getUserInput() (string, string, string, uint) {
	var firstName, lastName, email string
	var userTickets uint

	fmt.Println("Enter your first name:")
	fmt.Scan(&firstName)
	fmt.Println("Enter your last name:")
	fmt.Scan(&lastName)
	fmt.Println("Enter your email:")
	fmt.Scan(&email)
	fmt.Println("Enter number of tickets:")
	fmt.Scan(&userTickets)

	return firstName, lastName, email, userTickets
}

// Book tickets for a user
func bookTickets(firstName string, lastName string, email string, userTickets uint) {
	remainingTickets -= userTickets

	//create a map user
	var userData = userData{
		firstName: firstName,
		lastName: lastName,
		email: email,
		numberOfTickets: userTickets,
	}
	// userData["firstName"] = firstName
	// userData["lastName"] = lastName
	// userData["email"] = email
	// userData["numberOfTickets"]=strconv.FormatUint(uint64(userTickets), 10)
	bookings = append(bookings, userData)
	fmt.Printf("List of booking is %v\n",bookings)

	fmt.Printf("Thank you %v %v for booking %v tickets. You will receive a confirmation email at %v.\n", firstName, lastName, userTickets, email)
	fmt.Printf("%v tickets remaining for %v\n", remainingTickets, ConferenceName)
}

// Get first names from bookings
func getFirstNames() []string {
	firstNames := []string{}
	for _, booking := range bookings {
	
		firstNames = append(firstNames, booking.firstName)
	}
	return firstNames
}

func sendTickets (userTickets string, firstName string, lastName string){
	time.Sleep(10 * time.Second)
	var ticket = fmt.Sprintf("%v tickets for %v %v", userTickets, firstName, lastName)
	fmt.Printf("Ticket sent: %v\n", ticket)
	wg.Done()
}
