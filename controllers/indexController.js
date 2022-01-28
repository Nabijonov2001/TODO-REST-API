const query = require("../models/postgres")

module.exports = class Todo{

    static async getTasks(req, res){
        try {
            const tasks = await query('SELECT * FROM tasks ORDER BY id DESC')
            res.json({
                ok:true,
                message:'Ma`lumotlar topildi',
                tasks
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error+""
            })
        }
    }

    static async postTask(req, res){
        try {
            const {name} = req.body
            const task = await query('INSERT INTO tasks (name) VALUES ($1) RETURNING *', [name])
            res.status(200).json({
                ok:true,
                message:'A new task created'
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error+""
            })
        }
    }

    static async updateTask(req, res){
        try {
            const id = req.params.id
            const {status} = req.body
            await query('UPDATE tasks SET status=$1 WHERE id=$2', [status, id])
            res.status(200).json({
                ok:true,
                message:"Updated!"
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:"Updated!"
            })
        }
    }

    static async deleteTask(req, res){
        try {
            console.log(req.params)
            const id = req.params.id
            await query("DELETE FROM tasks WHERE id=$1", [id])
            res.status(200).json({
                ok:true,
                message:"Deleted"
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:"Task deleted"
            })
        }
    }
}