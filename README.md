# Mobily.dev Website

A simple static website for mobily.dev domain with a blue gradient background and personalized greeting functionality. Built with Go Fiber v2 for high performance and scalability.

**Note:** This website is not owned or managed by Mobily Telecommunications company and is not related to it.

## Features

- **Simple Design**: Clean blue gradient background with centered white greeting box
- **Personalized Greeting**: Add `?hi=YourName` to the URL to personalize the greeting
  - Example: `https://mobily.dev?hi=Omar+Mohammed` will display "Hi there Omar Mohammed! 👋"
- **HTTPS Redirect**: Automatically redirects HTTP traffic to HTTPS
- **Responsive Design**: Works on all device sizes

## Prerequisites

- Go 1.24 or later (for local development)
- Docker and Docker Compose (for containerized deployment)
- A web server with SSL certificate (required for Universal Links)

## Directory Structure

```
.
├── public/
│   ├── css/
│   │   ├── style.css
│   │   └── w.css
│   ├── js/
│   │   └── waypoint.js
│   ├── images/
│   │   ├── app-store-badge.svg
│   │   ├── apple-maps-icon.svg
│   │   ├── google-maps-icon.svg
│   │   └── hero-app.png
│   ├── .well-known/
│   │   └── apple-app-site-association
│   ├── index.html
│   └── w/
│       └── index.html
├── Dockerfile
├── docker-compose.yml
├── go.mod
└── main.go
```

## Setup

1. Clone the repository
2. Update the `appID` in `public/.well-known/apple-app-site-association` with your iOS app Team ID
3. Add your app screenshots and App Store assets to the `public/images` directory
4. Update the App Store link in the HTML files

## Running Locally

### Without Docker

```bash
# Install dependencies
go mod download

# Run the server
go run main.go
```

The server will start on port 8080 by default. You can change the port by setting the `PORT` environment variable.

### With Docker

Build and run using Docker Compose:

```bash
# Build and start the containers
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop the containers
docker-compose down
```

Or using Docker directly:

```bash
# Build the image
docker build -t rahhal-website .

# Run the container
docker run -p 8080:8080 rahhal-website
```

## Production Deployment

### Using Docker (Recommended)

1. Ensure your server has Docker and Docker Compose installed
2. Clone the repository on your server
3. Configure SSL:
   - Uncomment the nginx service in docker-compose.yml
   - Add your SSL certificates to the ssl/ directory
   - Configure nginx.conf with your domain
4. Start the services:
   ```bash
   docker-compose up -d
   ```

### Manual Deployment

1. Ensure your domain has SSL certificate (required for Universal Links)
2. Set up your web server to serve the static files from the `public` directory
3. Configure your DNS to point to your server
4. Update your iOS app with the associated domain capability

## Performance Features

The website uses Go Fiber v2 with several optimizations:

- **Prefork Mode**: Automatically utilizes all CPU cores
- **Response Compression**: Reduces bandwidth usage
- **Static File Caching**: Improves load times
- **Panic Recovery**: Ensures high availability
- **Request Logging**: For monitoring and debugging

## Universal Links

The website supports Universal Links for the iOS app. When users visit a location URL (e.g., `https://rahhal.app/w?ll=25.247437,46.631706`), they will be prompted to open the location in the Rahhal app if installed.

## Development

To modify the website:

1. Edit the HTML files in the `public` directory
2. Update styles in `public/css`
3. Modify JavaScript functionality in `public/js`
4. Test all changes locally before deployment

## License

All rights reserved. © 2024 Rahhal
