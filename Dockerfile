# Build stage
FROM golang:1.24.0-alpine

# Install build dependencies
RUN apk add --no-cache gcc musl-dev

# Disable CGO, which is required for any C code to be compiled
ENV CGO_ENABLED=0

# Set working directory
WORKDIR /app

# Copy and download dependencies first
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build binary with CGO enabled
RUN go build -o main .

# App port
EXPOSE 8080

# Run application
CMD ["./main"]