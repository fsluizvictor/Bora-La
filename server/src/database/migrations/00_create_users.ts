import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('image')
        table.string('registration').notNullable().unique()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.string('birth').notNullable()
        table.string('course')
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.string('whatsapp').notNullable()
        table.string('description').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users')
}

