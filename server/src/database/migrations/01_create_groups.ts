import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('groups', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('date')
        table.string('description').notNullable()
        table.string('occupation_area')
        table.string('rules').notNullable()
        table.string('image').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('groups')
}
