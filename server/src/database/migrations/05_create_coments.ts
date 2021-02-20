import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('coments', table => {
        table.increments('id').primary().notNullable()
        table.integer('id_post').references('id').inTable('posts').notNullable()
        table.string('contents')
        table.string('date')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('coments')
}

