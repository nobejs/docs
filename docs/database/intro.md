# Intro

### About

We didn't integrate any ORM and Nobe doesn't stop you from any ORM of your like either. We felt migrations is an important tool for developers, so we use knex for that purpose, which is good enough for many usecases.

The applications which we have been developing use KnexJS Query Builder too, essentially, our thought process is that ORM obscure us into directly dealing with database queries. Instead, Knex helps reduce lot of boilerplate.

### Config

The out of box config of Knex is driven from .env, .env.jest files.

If you want to use any custom config, you can just modify `knexfile.js`

### Migrations

The complete documentation for Knex Migration CLI is here: https://knexjs.org/#Migrations-CLI

There are three commands which come out of box:

#### `db:migration`

You can run `yarn db:migration migration_file_name` which would create migration file in `database/migrations`

#### `db:rollback`

You can run `yarn db:rollback` to rollback migrations. For more options please refer to: https://knexjs.org/#Migrations-rollback

#### `db:migrate`

You can run `ENVFILE=.env yarn db:migrate` to migrate the pending migrations. 