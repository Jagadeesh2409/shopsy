exports.up = function(knex) {
    return knex.schema.createTable('uploads',(table)=>{
        table.increments('id').primary();
        table.string('type').notNullable();
        table.string('image_url').notNullable().unique()
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
};


exports.down = function(knex) {
    return knex.schema.dropTableIfExists('uploads')
};
