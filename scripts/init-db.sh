#!/bin/bash

set -e

DB_NAME=${1:-database_name}
DB_USER=${2:-database_user}
DB_USER_PASS=${3:-hard_password}

psql -U postgres <<EOF
    CREATE DATABASE $DB_NAME;
    CREATE USER $DB_USER WITH PASSWORD '$DB_USER_PASS';
    ALTER USER $DB_USER WITH login;
    GRANT ALL PRIVILEGES ON DATABASE $DB_NAME to $DB_USER;
EOF