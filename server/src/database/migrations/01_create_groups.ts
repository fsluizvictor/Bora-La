import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('groups', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('date').notNullable()
        table.string('description').notNullable()
        table.string('occupation_area').notNullable()
        table.string('rules').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('groups')
}
