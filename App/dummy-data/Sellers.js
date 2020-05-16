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
        id: '1',
        name: "YELLOW",
        picture: require('../assets/Images/yellow.png'), 
        description: 'This is a simple shop'
    },
    {
        id: '2',
        name: "Cats Eye",
        picture: require('../assets/Images/catseye2.jpg'), 
        description: 'This is a simple shop'
    },
    {
        id: '3',
        name: "ecstasy",
        picture: require('../assets/Images/ecstasy.jpg'), 
        description: `This is a simple shop, with simple needs, ples give us money
You can give us money by coming to our stores or simply by shopping here, easy right!`
    },
    {
        id: '4',
        name: "splash",
        picture: require('../assets/Images/splash.jpg'), 
        description: 'This is a simple shop'
    },
    {
        id: '5',
        name: "YELLOW",
        picture: require('../assets/Images/seller.png'), 
        description: 'This is a simple shop'
    }
]