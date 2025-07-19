package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file before any other code
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: .env file not found")
	}

	// Create new Fiber app
	app := fiber.New(fiber.Config{
		AppName:      "Mobily.dev Website",
		ServerHeader: "Fiber",
		// Prefork: When set to true, the server will fork into multiple processes (one per CPU core)
		// to handle requests in parallel. However, this is incompatible with Docker containers
		// and should remain false when running in containerized environments.
		// For non-containerized deployments, setting to true can improve performance on multi-core systems.
		Prefork: os.Getenv("PREFORK") == "true",
	})

	// Add middleware
	app.Use(logger.New())   // Request logging
	app.Use(recover.New())  // Panic recovery
	app.Use(compress.New()) // Response compression
	app.Use(cors.New())     // CORS support

	// HTTPS redirect middleware (only in production)
	app.Use(func(c *fiber.Ctx) error {
		if c.Get("X-Forwarded-Proto") == "http" && os.Getenv("ENVIRONMENT") == "production" {
			return c.Redirect("https://"+c.Hostname()+c.OriginalURL(), 301)
		}
		return c.Next()
	})

	// Add no-cache middleware
	app.Use(func(c *fiber.Ctx) error {
		c.Set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
		c.Set("Pragma", "no-cache")
		c.Set("Expires", "0")
		return c.Next()
	})

	// Special handler for apple-app-site-association
	app.Get("/.well-known/apple-app-site-association", func(c *fiber.Ctx) error {
		c.Set("Content-Type", "application/json")
		return c.SendFile("./public/.well-known/apple-app-site-association")
	})

	// Special handler for waypoint URLs
	app.Get("/w", func(c *fiber.Ctx) error {
		return c.SendFile("./public/w/index.html")
	})

	// Serve static files
	app.Static("/", "./public", fiber.Static{
		Compress: true,
		Browse:   false,
	})

	// Get port from environment variable or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	log.Printf("Server starting on port %s...\n", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatal(err)
	}
}
