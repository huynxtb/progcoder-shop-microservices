#!/bin/sh

# ============================================
# Elasticsearch Watermark Settings Configuration Script
# ============================================
# This script automatically configures Elasticsearch disk watermark settings
# to prevent issues with low disk space.

set -e

# Configuration
ELASTICSEARCH_HOST="${ELASTICSEARCH_HOST:-elasticsearch}"
ELASTICSEARCH_PORT="${ELASTICSEARCH_PORT:-9200}"
ELASTICSEARCH_USER="${ELASTICSEARCH_USER:-elastic}"
ELASTICSEARCH_URL="http://${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}"
MAX_RETRIES=30
RETRY_INTERVAL=10
INITIAL_WAIT=30

# Watermark settings (hardcoded as requested)
WATERMARK_LOW="95%"
WATERMARK_HIGH="98%"
WATERMARK_FLOOD_STAGE="99%"

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

# Function to wait for Elasticsearch to be ready
wait_for_elasticsearch() {
  log_info "Waiting ${INITIAL_WAIT}s for Elasticsearch to initialize..."
  sleep $INITIAL_WAIT
  
  log_info "Checking Elasticsearch readiness at ${ELASTICSEARCH_URL}..."
  
  retries=0
  while [ $retries -lt $MAX_RETRIES ]; do
    if curl -s -u "${ELASTICSEARCH_USER}:${ELASTIC_PASSWORD}" "${ELASTICSEARCH_URL}/_cluster/health" | grep -q '"status"'; then
      log_success "Elasticsearch is ready!"
      return 0
    fi
    
    retries=$((retries + 1))
    log_info "Elasticsearch not ready yet. Retry $retries/$MAX_RETRIES in ${RETRY_INTERVAL}s..."
    sleep $RETRY_INTERVAL
  done
  
  log_error "Elasticsearch failed to become ready after $MAX_RETRIES attempts"
  return 1
}

# Function to configure watermark settings
configure_watermark_settings() {
  log_info "Configuring Elasticsearch disk watermark settings..."
  log_info "  - Low watermark: ${WATERMARK_LOW}"
  log_info "  - High watermark: ${WATERMARK_HIGH}"
  log_info "  - Flood stage: ${WATERMARK_FLOOD_STAGE}"
  
  # Prepare JSON payload
  JSON_PAYLOAD="{\"persistent\":{\"cluster.routing.allocation.disk.watermark.low\":\"${WATERMARK_LOW}\",\"cluster.routing.allocation.disk.watermark.high\":\"${WATERMARK_HIGH}\",\"cluster.routing.allocation.disk.watermark.flood_stage\":\"${WATERMARK_FLOOD_STAGE}\"}}"
  
  # Send configuration request
  RESPONSE=$(curl -s -w "\n%{http_code}" \
    -u "${ELASTICSEARCH_USER}:${ELASTIC_PASSWORD}" \
    -X PUT "${ELASTICSEARCH_URL}/_cluster/settings" \
    -H "Content-Type: application/json" \
    -d "$JSON_PAYLOAD" 2>&1)
  
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')
  
  if [ "$HTTP_CODE" -eq 200 ]; then
    log_success "Elasticsearch disk watermark settings configured successfully!"
    return 0
  else
    log_error "Failed to configure watermark settings (HTTP ${HTTP_CODE})"
    log_error "Response: ${BODY}"
    return 1
  fi
}

# Main execution
main() {
  log_info "=========================================="
  log_info "Elasticsearch Watermark Configuration"
  log_info "=========================================="
  
  # Wait for Elasticsearch to be ready
  if ! wait_for_elasticsearch; then
    log_error "Cannot proceed without Elasticsearch being available"
    exit 1
  fi
  
  echo ""
  
  # Configure watermark settings
  if configure_watermark_settings; then
    echo ""
    log_info "=========================================="
    log_success "Configuration completed successfully!"
    log_info "=========================================="
    exit 0
  else
    echo ""
    log_info "=========================================="
    log_error "Configuration failed!"
    log_info "=========================================="
    exit 1
  fi
}

# Run main function
main

