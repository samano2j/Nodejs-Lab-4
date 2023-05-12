const router = require('express').Router()
const uuid = require("uuid")

const members = [
    { id: uuid.v4(), name: "Mario", email: "mario@mail.com" },
    { id: uuid.v4(), name: "Luigi", email: "luigi@mail.com" },
    { id: uuid.v4(), name: "Yoshi", email: "yoshi@mail.com" },
]

// router.get('/', (req, res) => res.json(members))

router.get('/', (req, res, next) => {
    res.render('listMembers', {pageTitle: 'List of Members', members})
})

router.get('/newMember', (req, res, next) => {
    res.render('newMember', {pageTitle: 'Add a Member'})
})

router.post('/newMember', (req, res, next) => {
    const { name, email } = req.body
    const newMember = {
        id: uuid.v4(),
        name: name,
        email: email
    }

    members.push(newMember)
    res.redirect('/api/members')
})

router.get('/singleMember', (req, res, next) => {
    const id = req.query.id
    members.forEach(function(member) {
        if (member.id === id) {
            res.render('singleMember', { pageTitle: 'List of Members', members: member });
        }
    })
})

// router.get('/:id', (req, res) => {
//     const paramsID = req.params.id
    
//     const found = members.some(member => member.id === paramsID)
    
//     if(found){
//         res.json(members.filter(member => member.id === paramsID))
//     }else{
//         res.status(400).json({ msg: `Member with id: ${paramsID}, is not found `})
//     }
// })

router.post('/', (req,res) => {
    const newData = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    members.push(newData)
    res.json(members)
})

module.exports = router