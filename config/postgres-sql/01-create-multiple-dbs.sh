#!/usr/bin/env bash
set -euo pipefail

# Comma-separated list, e.g. POSTGRES_MULTIPLE_DATABASES="keycloak_db,metrics,events"
DBS="${POSTGRES_MULTIPLE_DATABASES:-}"

echo "[init] POSTGRES_MULTIPLE_DATABASES='${DBS}'"
if [[ -z "${DBS}" ]]; then
  echo "[init] No databases requested; skipping."
  exit 0
fi

IFS=',' read -ra NAMES <<< "${DBS}"
for DB in "${NAMES[@]}"; do
  DB="$(echo "$DB" | xargs)"   # trim spaces
  [[ -z "$DB" ]] && continue

  echo "[init] Ensure database: '$DB'"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
    SELECT 'CREATE DATABASE "' || replace('$DB','"','""') || '";'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB');
    \gexec
EOSQL
done

echo "[init] Done."
