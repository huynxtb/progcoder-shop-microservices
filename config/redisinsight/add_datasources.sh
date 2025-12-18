#!/bin/sh

# ============================================
# RedisInsight Data Source Initialization Script
# ============================================
# This script automatically adds Redis instances to RedisInsight
# for easy monitoring and management.

set -e

# Configuration
REDISINSIGHT_HOST="${REDISINSIGHT_HOST:-redisinsight}"
REDISINSIGHT_PORT="${REDISINSIGHT_PORT:-5540}"
API_URL="http://${REDISINSIGHT_HOST}:${REDISINSIGHT_PORT}/api"
MAX_RETRIES=30
RETRY_INTERVAL=15

# Redis instances configuration (hardcoded as requested)
# Format: "Display Name|Host|Port|Password|Database Index"
# Add more instances by adding lines below
REDIS_INSTANCES="
ProG Coder Cache|redis|6379|123456789Aa|0
"

# Function to print colored messages
log_info() {
  printf "\033[0;34m[INFO]\033[0m %s\n" "$1"
}

log_success() {
  printf "\033[0;32m[SUCCESS]\033[0m %s\n" "$1"
}

log_warning() {
  printf "\033[1;33m[WARNING]\033[0m %s\n" "$1"
}

log_error() {
  printf "\033[0;31m[ERROR]\033[0m %s\n" "$1"
}

# Function to wait for RedisInsight to be ready
wait_for_redisinsight() {
  log_info "Waiting for RedisInsight to be ready at ${API_URL}..."
  
  retries=0
  while [ $retries -lt $MAX_RETRIES ]; do
    if curl -s -f "${API_URL}/databases" > /dev/null 2>&1; then
      log_success "RedisInsight is ready!"
      return 0
    fi
    
    retries=$((retries + 1))
    log_info "RedisInsight not ready yet. Retry $retries/$MAX_RETRIES in ${RETRY_INTERVAL}s..."
    sleep $RETRY_INTERVAL
  done
  
  log_error "RedisInsight failed to become ready after $MAX_RETRIES attempts"
  return 1
}

# Function to check if a database already exists
database_exists() {
  DB_NAME="$1"
  RESPONSE=$(curl -s "${API_URL}/databases" 2>/dev/null)
  
  echo "$RESPONSE" | grep -q "\"name\":\"$DB_NAME\""
  return $?
}

# Function to add a Redis database to RedisInsight
add_redis_database() {
  NAME="$1"
  HOST="$2"
  PORT="$3"
  PASSWORD="$4"
  DB_INDEX="$5"

  log_info "Adding Redis database: ${NAME}..."

  # Check if database already exists
  if database_exists "$NAME"; then
    log_warning "Database '$NAME' already exists. Skipping..."
    return 0
  fi

  # Prepare JSON payload
  JSON_PAYLOAD="{\"host\":\"${HOST}\",\"port\":${PORT},\"name\":\"${NAME}\",\"password\":\"${PASSWORD}\",\"db\":${DB_INDEX}}"

  # Add database
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${API_URL}/databases" \
    -H "Content-Type: application/json" \
    -d "$JSON_PAYLOAD" 2>&1)
  
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  if [ "$HTTP_CODE" -eq 201 ] || [ "$HTTP_CODE" -eq 200 ]; then
    log_success "Successfully added Redis database: ${NAME}"
    return 0
  else
    log_error "Failed to add Redis database: ${NAME} (HTTP ${HTTP_CODE})"
    log_error "Response: ${BODY}"
    return 1
  fi
}

# Main execution
main() {
  log_info "=========================================="
  log_info "RedisInsight Data Source Initialization"
  log_info "=========================================="
  
  # Wait for RedisInsight to be ready
  if ! wait_for_redisinsight; then
    log_error "Cannot proceed without RedisInsight being available"
    exit 1
  fi
  
  log_info "Starting to add Redis instances..."
  echo ""
  
  SUCCESS_COUNT=0
  FAILED_COUNT=0
  
  # Process each Redis instance
  echo "$REDIS_INSTANCES" | while IFS='|' read -r REDIS_NAME REDIS_HOST REDIS_PORT REDIS_PASSWORD REDIS_DB_INDEX; do
    # Skip empty lines and comments
    case "$REDIS_NAME" in
      ''|'#'*) continue ;;
    esac
    
    # Trim whitespace
    REDIS_NAME=$(echo "$REDIS_NAME" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    REDIS_HOST=$(echo "$REDIS_HOST" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    REDIS_PORT=$(echo "$REDIS_PORT" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    REDIS_PASSWORD=$(echo "$REDIS_PASSWORD" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    REDIS_DB_INDEX=$(echo "$REDIS_DB_INDEX" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    
    if [ -n "$REDIS_NAME" ]; then
      if add_redis_database "$REDIS_NAME" "$REDIS_HOST" "$REDIS_PORT" "$REDIS_PASSWORD" "$REDIS_DB_INDEX"; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
      else
        FAILED_COUNT=$((FAILED_COUNT + 1))
      fi
      echo ""
    fi
  done
  
  log_info "=========================================="
  log_info "Summary:"
  log_success "Successfully added: ${SUCCESS_COUNT}"
  if [ $FAILED_COUNT -gt 0 ]; then
    log_error "Failed: ${FAILED_COUNT}"
  fi
  log_info "=========================================="
  
  if [ $FAILED_COUNT -gt 0 ]; then
    exit 1
  fi
  
  log_success "All Redis databases have been configured successfully!"
}

# Run main function
main
