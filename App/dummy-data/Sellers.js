class Seller {

    constructor(id, name) {
        this.id = id
        this.name = name

    }
}


const SHOPS = [
    new Seller('1', "YELLOW"),
    new Seller('2', "Cats Eye"),
    new Seller('3', "Ecstasy"),
    new Seller('4', "Splash")
]
export const SELLERS = [
    {
        id: 1,
        name: "YELLOW",
        picture: require('../assets/Images/seller.png'), 
        description: 'This is a simple shop'
    },
    {
        id: 2,
        name: "Cats Eye",
        picture: require('../assets/Images/seller.png'), 
        description: 'This is a simple shop'
    },
    {
        id: 3,
        name: "YELLOW",
        picture: require('../assets/Images/seller.png'), 
        description: 'This is a simple shop'
    },
    {
        id: 4,
        name: "YELLOW",
        picture: require('../assets/Images/seller.png'), 
        description: 'This is a simple shop'
    },
    {
        id: 5,
        name: "YELLOW",
        picture: require('../assets/Images/seller.png'), 
        description: 'This is a simple shop'
    }
]