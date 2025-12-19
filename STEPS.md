# Bước 1: Chỉ chạy infrastructure services trước
docker-compose up -d sql-server postgres-sql mongodb mysql minio keycloak redis redisinsight redisinsight-init rabbitmq mailhog elasticsearch elasticsearch-init portainer prometheus grafana cadvisor otel-collector loki promtail tempo
 
# Bước 2: Build và chạy gRPC services
docker-compose up --build -d catalog-grpc inventory-grpc order-grpc discount-grpc report-grpc

# Bước 3: Build và chạy API services
docker-compose up --build -d catalog-api basket-api inventory-api order-api discount-api notification-api search-api report-api communication-api

# Bước 4: Build và chạy Workers
docker-compose up --build -d catalog-worker-outbox basket-worker-outbox inventory-worker-outbox order-worker-outbox

# Bước 4: Build và chạy Worker Consumers & Processors
docker-compose up --build -d catalog-worker-consumer inventory-worker-consumer order-worker-consumer search-worker-consumer notification-worker-consumer notification-worker-processor

# Bước 5: Build và chạy API Gateway và Apps
docker-compose up --build -d app-job api-gateway