
let houseDB = require('./db.json')
let houseID = 4


module.exports = {
    getHouses: (req,res) => {
        res.status(200).send(houseDB)
    },
    createHouse: (req,res) => {
        req.body.id = houseID
        houseDB.push(req.body)
        res.status(200).send(houseDB)
        houseID++

    }, 
    updateHouse: (req,res) => {
        let { id } = req.params
        let { type } = req.body
        let index = houseDB.findIndex(house => house.id === +id)

        if(type === 'minus' && houseDB[index].price > 0){
            houseDB[index].price -= 10000
        } else if(type === 'plus'){
            houseDB[index].price += 10000
        } else {
            res.status(400).send('bad request!')
            return
        }

        res.status(200).send(houseDB)

    },
    deleteHouse: (req,res) => {
        let { id } = req.params
        let index = houseDB.findIndex(house => house.id === +id)
        houseDB.splice(index, 1)
        res.status(200).send(houseDB)
    
    }

}