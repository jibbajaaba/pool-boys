# Database Schema

## Users Table

| Column       | Type     | Constraints |
|--------------|----------|-------------|
| id           | serial   | NOT NULL    |
| username     | string   | NOT NULL    |
| first_name   | string   | NOT NULL    |
| last_name    | string   | NOT NULL    |
| phone_number | string   | NOT NULL    |
| age          | int      | NOT NULL    |
| email        | string   | NOT NULL    |

## Pools Table

| Column         | Type     | Constraints |
|----------------|----------|-------------|
| id             | serial   | NOT NULL    |
| picture_url    | string   | NOT NULL    |
| address        | string   | NOT NULL    |
| days_available | string   | NOT NULL    |
| description    | string   | NOT NULL    |
| hourly_rate    | int      | NOT NULL    |
| number_guests  | int      | NOT NULL    |
| poolowner_id   | int      | NOT NULL    |

## Reservations Table

| Column      | Type      | Constraints |
|-------------|-----------|-------------|
| id          | serial    | NOT NULL    |
| date        | isoformat | NOT NULL    |
| start_time  | isoformat | NOT NULL    |
| end_time    | isoformat | NOT NULL    |
| pool_id     | int       | NOT NULL    |
| users_id    | int       | NOT NULL    |

## Amenities Table

| Column | Type   | Constraints |
|--------|--------|-------------|
| id     | serial | NOT NULL    |
| name   | string | NOT NULL    |

## Pool Amenities Table

| Column       | Type | Constraints |
|--------------|------|-------------|
| id           | serial | NOT NULL  |
| pool_id      | int    | NOT NULL  |
| amenities_id | int    | NOT NULL  |

## Foreign Key Constraints

- **Pools Table**
  - `poolowner_id` references `users(id)`.

- **Reservations Table**
  - `pool_id` references `pools(id)`.
  - `users_id` references `users(id)`.

- **Pool Amenities Table**
  - `pool_id` references `pools(id)`.
  - `amenities_id` references `amenities(id)`.
