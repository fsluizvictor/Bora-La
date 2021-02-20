import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('posts', table => {
        table.increments('id').primary().notNullable()
        table.integer('id_group').references('id').inTable('groups').notNullable()
        table.string('contents')
        table.string('date')
        table.integer('like')
        table.integer('ban')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('posts')
}

