create type login_method_enum as ENUM('password', 'oauth', 'sso');

create type login_status_enum as ENUM('success', 'failure');

create table users (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid() unique,
    full_name text,
    email text,
    user_password text,
    created_at text,
    updated_at text,
    user_role text
);

create table emails (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid() unique,
    from_who text,
    to_who text,
    email_subject text,
    body_html text,
    email_status text,
    text text,
    sent_at text,
    user_id int references users(id)
);

create table api_keys (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid() unique,
    user_id int references users(id),
    key text unique,
    created_at text
);

create table tokens (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid() unique,
    token text unique,
    auth_type text,
    user_id INT UNIQUE REFERENCES users(id),
);

CREATE TABLE login_history (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    user_id int references users(id),
    login_text text,
    logout_text text,
    login_method login_method_enum,
    login_status login_status_enum
);