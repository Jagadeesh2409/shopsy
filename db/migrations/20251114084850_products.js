exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description');
    table.decimal('original_price', 10, 2).notNullable();
    table.decimal('mrp', 10, 2).notNullable().checkPositive();
    table.decimal('selling_price', 10, 2).notNullable();
    table.decimal('discount',2);
    table.string('discount_type');
    table.decimal('tax',2);
    table.json('details');
    table.string('brand').notNullable();
    table.integer('stock').notNullable().defaultTo(0);
    table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
    table.integer('unit_id').unsigned().references('id').inTable('units').onDelete('CASCADE');
    table.integer('productId').unsigned().references('id').inTable('uploads').onDelete('SET NULL');
    table.string('slug').notNullable().unique();
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('products');
};
