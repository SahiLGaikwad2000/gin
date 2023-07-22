package main

import ("github.com/gin-gonic/gin"
		"net/http"
		"database/sql"
		"fmt"
		"log"
	
		_ "github.com/go-sql-driver/mysql"
	)



func main() {
	router := gin.Default()
	router.Use(corsMiddleware())
	// Define your API endpoints here
	router.POST("/hello", helloHandler)

	// Run the server on port 8080
	router.Run(":8080")
}

func helloHandler(c *gin.Context) {
	openconn()
	c.JSON(200, gin.H{
		"message": "Hello, World!",
	})
}




const (
	dbUser     = "root"
	dbPassword = "tiger"
	dbName     = "gin"
)

func openconn() {
	// Open a connection to the database
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@/%s", dbUser, dbPassword, dbName))
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	defer db.Close()

	// Insert data into the users table
	insertData(db, "JohnDoe", "john.doe@example.com", "secretPassword")
}

func insertData(db *sql.DB, username, email, password string) {
	// Prepare the SQL statement for inserting data
	stmt, err := db.Prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)")
	if err != nil {
		log.Fatalf("Error preparing SQL statement: %v", err)
	}
	defer stmt.Close()

	// Execute the SQL statement to insert data
	_, err = stmt.Exec(username, email, password)
	if err != nil {
		log.Fatalf("Error inserting data: %v", err)
	}

	log.Println("Data inserted successfully.")
}
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Check for preflight requests (OPTIONS)
		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}