# LHL Midterm Project Notes


## Website Outline

#### Website Name: TEAM FIVE!!!

This is a Ecommerce auction-style website where buyers & sellers can trade in four categories of electronic items: Laptops, Desktops, Mini PCs & Phones. This will be a multi-page app, that may also incorporate Single-Page applications (SPA). 

Project Goal: This project is NOT intended to be a full-scale project, but rather a demonstrator of a team's ability to plan, organize, design and build a basic website in two weeks. As such, this project will produce a minimum viable demo (MVD).


The website will have 4 categories of product, each with 3 items (SKUs) per category (to start with).


The category pages will have filters for:

  * Price
  * Availability


## User Stories (and their Webpages)

Non-logged-in user:

- As a non logged-in user, I can see featured items in the main feed.
  [Homepage Page]

- As a non logged-in user, I can filter items by price, availability etc.
  [Homepage Page]


Logged-in user:

- As a logged-in user, I can favourite items. [Category, Product Page]

- As a logged-in user, I can send messages to the seller of the item. [Product Page]


Admin user (1 - 2 users):

An admin is a superuser that can buy, or sell. They have additional powers:

- As a logged-in 'admin', I can add new items which can be seen by anyone.
  [Add/Edit Items Page]

- As a logged-in 'admin', I can edit items which I listed. [Add/Edit Items Page]

- As a logged-in 'admin', I can delete items which I listed.
  [Category Page: With "Are you sure"? alert]

- As a logged-in 'admin', I can mark items as SOLD.
  [Add/Edit Items Page]


## Routes

```

Browse  // GET    / -> Home page
Read    // GET
Edit    // POST
Add     // POST
Delete  // POST

------------------

Browse  // GET
Read    // GET    items/categories/:category_id -> Category page
Edit    // POST   [Proper RESTful Route: /items?categories="my-category"]
Add     // POST
Delete  // POST

------------------

Browse  // GET
Read    // GET    /login/:user_id
                  /items/:item_id/edit
                  /items/add
Edit    // POST
Add     // POST
Delete  // POST

------------------

Browse  // GET
Read    // GET    /items/:item_id -> Product page
Edit    // POST   /items/:item_id/update
			      /items/:item_id/fav
Add     // POST   /items/create_new
Delete  // POST   /items/:item_id/delete

```



## Project Setup (For first time only)

Starting Point: The Midterm project has been setup for first use [Tuan].

  Clone project & update it:

  * `git clone`
  * `git checkout master`
  * `git pull origin master`


  Add & Setup Database Locally
 
  * Install PostgreSQL in project: `npm i pg`.
  * Connect to vagrant PostgreSQL database: `psql -U vagrant -d template1`.
  * Create database & add credentials:
 
  	* `CREATE ROLE x WITH LOGIN password 'y';`
	* `CREATE DATABASE midterm OWNER x;`

	
  Setup Project Locally
 
  * Create the `.env` by using `.env.example` as a reference.
  * Update the .env file with your correct local information:
 
 	* username: `x`
 	* password: `y`
 	* database: midterm
 
  * Install dependencies: `npm i`.
  * Fix to binaries for sass: `npm rebuild node-sass`.
  * Reset database: `npm run db:reset`.
    [Check the db folder to see what gets created and seeded in the SDB]
 

  Starting the Program

  * Run the server: `npm run local`.
    [Note: nodemon is used, so you should not have to restart your server]
  * Visit `http://localhost:8080/`.


## Git Workflow

### Now You Can Get to Work

* After initial setup, never commit directly to master again. Use branches to do your work in.

Branches

  * Checkout a new branch: `git checkout -b newbranch`
  * Do your work on this branch.
  * If you need to come back and work on a `feature` branch, name it `feature-v2`.

* Once you are done working on a feature/bugfix, you need to propogate the changes in a different way from how you've been doing it so far. 

* Let's understand the state of your local repo: Before you started work, your local repository's `master` branch was made up to date with the remote branch (on Github). Then, you forked off a new branch from `master` and made commits to it. The feature branch is now ahead of your local `master`. 

* Do NOT merge your feature branch back into master LOCALLY! (This is what you've been doing so far in the program.) Instead, handle it on Github by making a Pull Request.


Pull Request

* In the branch you've been working in, push your changes to Github: `git push origin my-branch`.
* You should get a notification on the project home page that urges you to compare and complete a pull request.

* Create a pull request.
* Resolve any merge conflicts that may occur.
* Merge the pull request into master.


Re-Starting the Cycle: Working on the Next Feature/Bugfix

* Now your changes should be part of `master` on Github. You can now go back to working on the next feature/bugfix.

* But your local repo's `master` branch still doesn't have changes you made in the feature branch. This branch is also probably outdated with respect to changes made by other team members to the remote repository's (Github) `master` branch. So the first thing you should do you update the local repo's 	`master` branch by pulling in changes from the remote `master`:

  * `git checkout master`
  * `git pull origin master`

* Now `master` should be fully up to date. Next, you can start work on a new task by creating a new feature/bugfix branch to work in:

  * `git checkout -b my-branch`
  * `git push origin my-branch`


## Databases


### Database Nouns/Tables

- Users —> id, name, email, password, phone_number, is_admin

- Items —> id, owner_id (FK), name, description (define name, make, product specifications etc.), price, availability/inventory, images_url, category, date_posted

- Messages —> id, sender_id (FK), recipient_id (FK), content, date (timestamp), item_id (FK)

- Favourites —> id, item_id (FK), user_id (FK)


## Project Management

* Trello [We are using Trello].
* Github Projects  has a built-in project board (similar to a kanban board).


## Developer Roles

* Break into pairs and work on a stack/layer (frontend/backend).
* Start off with something you're fairly comfortable with and then switch to tasks/roles you're not. It's important to NOT do only the things you like, but also the tasks you don't.


## Suggested Preparation

* Study the Midterm Skeleton first so you understand it.
* Study LightBnB in prep for starting to code.


## Stretch Goals

* Search Functionality
* Responsive Design
* Favourites Page
* Real-time Chat [Web Sockets]


## Non-Goals

* Buy Button [Too much work for the midterm project]
* Deploying the website to a host [Overkill for an MVD]


## Tools

* Github Desktop
* Tableplus - database GUI