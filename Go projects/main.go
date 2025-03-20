package main

import (
	"fmt"
	"strings"
)

func main() {
	ConferenceName := "Go Conference"
	const conferenceTickets = 50
	fmt.Println("hello world")
	fmt.Println("welcome back again")

	greetUsers(ConferenceName)

bookings := []string{
	"John Doe",
	"Jane Doe",
	"John Smith",
}

	var firstName string
	var lastName string
	var email string

	fmt.Printf("Please enter your first name, last name and email: \n")
	fmt.Scan(&firstName)
	fmt.Scan(&lastName)
	fmt.Scan(&email)
	fmt.Printf("Hello %v %v, your email is %v", firstName, lastName, email)


	fmt.Printf("conference name is: %v \n", ConferenceName)
	fmt.Printf("conference tickets are: %v \n", conferenceTickets)
	fmt.Println(ConferenceName)



	firstNames := [] string{}
	for _, booking := range bookings {
		var names = strings.Fields(booking)
		firstNames = append(firstNames, names[0])
	}
	fmt.Printf("Theses are the all the bookings %v\n", firstNames)







	var userName string
	var userTickets int
	//ask user for theire name
	userName = "Tomi"
	userTickets = 2
	fmt.Printf("Hello %v, you have %v tickets for the %v \n", userName, userTickets, ConferenceName)


	city := "London"
	switch city {
		case "Paris":
			//
		case "London":
			//
		case "New York":
			//
		case "Tokyo":
			//
		default:
			fmt.Print("not valuid anyone")

	}


}

func greetUsers(conferenceName string) {
	fmt.Printf("Hello, welcome to the %v\n", conferenceName)
}