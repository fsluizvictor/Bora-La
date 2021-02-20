import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('users_has_groups', table => {
        table.increments('id').primary()
        table.integer('id_user').references('id').inTable('users')
        table.integer('id_group').references('id').inTable('groups')
    
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users_has_groups')
}
