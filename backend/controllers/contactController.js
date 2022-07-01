const contactSchema = require('../models/contact')

class ContactController {

    async getAllContact(req, res, next) {
        try {
            const contact = await contactSchema.find(req.query)
            .populate('user') 
            res.send(contact)
        }
        catch (err) {
            throw new Error(err)
        }
    }

    async getContactFromUser(req,res){
        try{
            const _id = req.params.id
            const contact = await contactSchema.find({'user': _id})
            res.send(contact)
        }catch(err){
            throw new Error(err)
        }
    }

    async addContact(req,res){
        const data = await new contactSchema({
            user : req.body.user,
            phone : req.body.phone,
            subject: req.body.subject,
            message : req.body.message,
        })
        try {
            const temp = await data.save()
            res.json(temp)
        }
        catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = new ContactController