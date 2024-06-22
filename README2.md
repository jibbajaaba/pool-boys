# PoolBoys

* Hasan Hamdan
* Cosimo Blodgett
* James Skinner
* Mark McTague

PoolBoys - Pool rental website to help pool owners connect with people who want to rent a pool and cool off.

## Design

* [Wireframe](/docs/mvp_diagram.png)
* [Database Model](/docs/datamodels.md)
* API end points
    * [pool api](/docs/pools_api.md)
    * [amenities api](/docs/amenities_api.md)
    * [reservations api](/docs/reservation_api.md)
    * [user api](/docs/user_api.md)
* FastAPI documentation can be found once project initialized by using URL: <http://localhost:8000/docs#/>

## Intended Market

 Pool-Boys is the platform designed specifically for pool owners and property owners with multiple rental units. This is not intended for large corporate rental companies or other businesses. This is for home owners or smaller rental property owners who want to maximize their income or make additional income from their pool.

 Pool-Boys: Turn your unused pool into a money-maker. Whether you have one backyard oasis or manage multiple pools, Pool-Boys helps you unlock their earning potential. Share your beautiful space with others when it's not in use and start generating extra income with ease.
##### It's perfect for:
* Homeowners with a pool: Rent out your pool during weekdays, weekends, or whenever you're not using it.
* Property managers: Maximize income on properties with pools by offering them to the community.
* Anyone with an underutilized pool: Transform your pool into a profitable asset with minimal effort.

## Functionality

* People who want to rent out their pool (pool owners) can come to our site to create an account and add their pool or pools to their profile.
    * Currently there is no user experience for renting out the pool for this iteration
* The home page details what we are and how we can help you earn additional money.
* Signup will give a user access to the rest of the website and it's features which you must be logged in to access
* Profile page shows the users information, a list of their pool or pools and a way to reserve their own pools to block off days from others reserving it.
* Click a pool in the profile page will take you to a pool detail page. This shows the pool information, and a reservation table of currently made reservations.
* Click the update button in the Profile page to update a pools information
* Click the delete button to delete a pool
* The Create pool button in the Nav bar will allow a user to create a pool
* There are also social media links in the footer

## Project Initialization

1. Clone the repository to your computer
2. CD into the new project directory
3. Run `docker volume create database_volume`
4. Run `docker volume create pg-admin`
5. Run `docker compose build`
6. Run `docker compose up`

### Creating your .env file

In order for the project to work properly a .env file must be created in the root directory of the project. due to the sensitive nature of the information in the .env file it is included in the .gitignore. You must include your own passwords and signing keys.

> POSTGRES_DB="db_name"
>
> POSTGRES_USER={"your user name"}
>
> POSTGRES_PASSWORD={"your password for db"}
>
> SIGNING_KEY={"your signing key goes here"}
>
> PGADMIN_EMAIL={"pg admin login email goes here"}
>
> PGADMIN_PASSWORD={"pg admin password goes here"}
