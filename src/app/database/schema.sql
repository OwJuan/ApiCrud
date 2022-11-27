CREATE DATABASE chefeeletronico;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    IF NOT EXISTS categories (
        id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS users (
        id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL,
        email VARCHAR UNIQUE,
        password VARCHAR,
        category_id UUID,
        FOREIGN KEY(category_id) REFERENCES categories(id)
    );

CREATE TABLE
    IF NOT EXISTS products (
        id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL,
        price DOUBLE,
        description VARCHAR,
        category VARCHAR,
        -- FOREIGN KEY(id) REFERENCES categories(id)
    );