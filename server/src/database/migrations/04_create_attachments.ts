import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('attachments', table => {
        table.increments('id').primary().notNullable()
        table.integer('id_post').references('id').inTable('posts').notNullable()
        table.string('url')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('attachments')
}

