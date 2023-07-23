package main

import ("github.com/gin-gonic/gin"
		"net/http"
		"database/sql"
		"fmt"
		"log"
		// "github.com/gin-contrib/cors"
	
		_ "github.com/go-sql-driver/mysql"
	)

type UserData struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
type ResponseData struct {
    Status string `json:"data"`;
	Message string `json:"data"`;
	Data string `json:"data"`
}

func main() {
	router := gin.Default()
	router.Use(corsMiddleware())
	// router.Use(cors.Default())
	// Define your API endpoints here
	router.POST("/signup", helloHandler)

	// Run the server on port 8080
	router.Run(":8080")
}

func helloHandler(c *gin.Context) {
	
	var userData UserData;
	c.ShouldBindJSON(&userData)
	fmt.Println(userData.Username)
	resp:=openconn(userData.Username,userData.Email,userData.Password)
	fmt.Println(resp.Status)
	c.JSON(200, gin.H{"status":resp.Status,"message":resp.Message})
}




const (
	dbUser     = "root"
	dbPassword = "tiger"
	dbName     = "gin"
)

func openconn(username,email,password string) ResponseData{
	// Open a connection to the database
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@/%s", dbUser, dbPassword, dbName))
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	defer db.Close()

	// Insert data into the users table
	return insertData(db, username, email,password)
	
}

func insertData(db *sql.DB, username, email, password string) ResponseData {
	// Prepare the SQL statement for inserting data
	// stmt, err := db.Prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)")
	// if err != nil {
	// 	log.Fatalf("Error preparing SQL statement: %v", err)
	// }
	// defer stmt.Close()

	// // Execute the SQL statement to insert data
	// _, err = stmt.Exec(username, email, password)
	// if err != nil {
	// 	log.Fatalf("Error inserting data: %v", err)
	// }

	// log.Println("Data inserted successfully.")
	var userCount int
    query := "SELECT COUNT(*) FROM users WHERE email = ?"
    err := db.QueryRow(query,email).Scan(&userCount)
    if err != nil {
		return ResponseData{
			Status:"red",
			Message: "Database query error",
		}
		// return gin.H{"error": "Database query error"}
        // c.JSON(http.StatusInternalServerError, gin.H{"error": "Database query error"})
        // return
    }

    // Insert or throw an error based on user existence
    if userCount > 0 {
		return ResponseData{
			Status:"red",
			Message: "User already exists",
		}
		// return gin.H{"error": "User already exists"}
        // c.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
        // return
    }

    // User does not exist, insert the user
    insertQuery := "INSERT INTO users (username, email,password) VALUES (?, ?, ?)"
    _, err = db.Exec(insertQuery, username, email, password)
    if err != nil {
		return ResponseData{
			Status:"red",
			Message: "Database insert error",
		}
        // c.JSON(http.StatusInternalServerError, gin.H{"error": "Database insert error"})
        // return
    }
	return ResponseData{
		Status:"green",
		Message: "User added successfully",
	}

    // c.JSON(http.StatusOK, gin.H{"message": "User added successfully"})
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