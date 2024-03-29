exports.up = knex => knex.schema.createTable("links", table => {

    table.increments("id");
    table.text("name").notNullable();



    table.integer("note_id").references("id").inTable("notes").onDelete("cascade");
    table.timestamp("created_at").default(knex.fn.now());
    
});

exports.down = knex => knex.schema.dropTable("links");