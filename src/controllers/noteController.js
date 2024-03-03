const knex  = require("../database/knex/index.js");

class NotesController{
    async create(req, res){
        const { title, description, tags, links } = req.body;
        const{user_id} = req.params;

        const [note_id] = await knex("notes").insert({

            title,
            description,
            user_id
    });
    
    const linksInsert = links.map(link => {
        return{

            note_id,
            url: link,

        }

    });

    await knex("links").insert(linksInsert);


    const tagsInsert = tags.map(name => {

        return{

            note_id,
            user_id,
            name

        }

    });
    
    
    await knex("tags").insert(tagsInsert);

    response.json();



    }
    async   show(req, res){
        const{id} = req.params;

        const note = await knex("notes").where({id}).first();
//com o codigo acima conseguimos abrir as notas que estão no banco de dados e estão relacionadas a um user id e atraves do first selecionamos apenas a primeira nota. 
        const tags = await knex("tags").where({note_id: note.id}).orderBy("name"); //com o codigo acima conseguimos abrir as tags que estão no banco de dados e estão relacionadas a um user id e atraves do first selecionamos apenas a primeira tag.
        const links = await knex("links").where({note_id: note.id}).orderBy("created_at"); //com o codigo acima conseguimos abrir as links que estão no banco de dados e estão relacionadas a um user id e atraves do first selecionamos apenas a primeira link.

        return res.json({
            ...note,
            tags,
            links
        });
    }
    async delete(req, res){
        const {id} = req.params;

        await knex("notes").where({id}).delete();

        return res.json();
    }

    async index(req, res){

        const{title, user_id} = req.query;

        const notes = await knex("notes")
        .where({user_id})
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }
}


module.exports = NotesController;