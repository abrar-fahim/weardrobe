class Product {

    constructor(id = id, name = name, shopname = shopname,price = price, picture = picture, description = description, rating = rating, color = color, size = size, postdate = postdate, discount = discount, category = category, quantity = quantity, modelno = modelno) {
        this.id = id;
        this.name = name;
        this.shopname = shopname;
        this.price = price;
        this.picture = picture;
        this.description = description;
        this.rating = rating;
        this.color = color;
        this.size = size;
        this.postdate = postdate;
        this.discount = discount;
        this.category = category;
        this.quantity = quantity
        this.modelno = modelno
       
    }
}


export const PRODUCTS2 = [
    new Product('1', "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product('2', "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product('3', "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product('4', "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product('5', "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product('6', "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product('7', "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product('8', "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product('9', "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product('10' , "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
]


const PRODUCTS = [
    {
        id: '1',
        name: 'Shirt',
        shopname: 'YELLOW',
        picture: require('../assets/Images/shirt2.jpg'),
        price: 500,
        rating: 5,
        description: "This is a nice shirt, ples buy",
        sizes: ['S, M, L, XL, XXL'],
        colors: ['black', 'blue', 'yellow', 'purple', 'orange']

    },
    {
        id: '2',
        name: 'Shirt',
        shopname: 'YELLOW',
        picture: require('../assets/Images/shirt2.jpg'),
        price: 500,
        rating: 4,
        description: "This is a nice shirt, ples buy",
        colors: ['black', 'blue', 'yellow'],
        sizes: ['S, M, L, XL, XXL']

    },
    {
        id: '3',
        name: 'Shirt',
        shopname: 'YELLOW',
        picture: require('../assets/Images/shirt.png'),
        price: 500,
        rating: 2,
        description: "This is a nice shirt, ples buy",
        colors: ['black', 'blue', 'yellow'],
        sizes: ['S, M, L, XL, XXL']

    },
    {
        id: '4',
        name: 'Shirt',
        shopname: 'YELLOW',
        picture: require('../assets/Images/shirt.png'),
        price: 500,
        rating: 4.5,
        description: "This is a nice shirt, ples buy",
        colors: ['black', 'blue', 'yellow'],
        sizes: ['S, M, L, XL, XXL']

    },
    {
        id: '5',
        name: 'Shirt',
        shopname: 'YELLOW',
        picture: require('../assets/Images/shirt.png'),
        price: 500,
        rating: 4.5,
        description: "This is a nice shirt, ples buy",
        colors: ['black', 'blue', 'yellow'],
        sizes: ['S, M, L, XL, XXL']

    },
    {
        id: '6',
        name: 'Shirt',
        shopname: 'YELLOW',
        picture: require('../assets/Images/shirt.png'),
        price: 500,
        rating: 4.5,
        description: "This is a nice shirt, ples buy",
        colors: ['black', 'blue', 'yellow'],
        sizes: ['S, M, L, XL, XXL']

    },
    {
        id: '7',
        name: 'Shirt',
        shopname: 'YELLOW',
        picture: require('../assets/Images/shirt.png'),
        price: 500,
        rating: 4.5,
        description: "This is a nice shirt, ples buy",
        colors: ['black', 'blue', 'yellow'],
        sizes: ['S, M, L, XL, XXL']

    },
    {
        id: '8',
        name: 'Shirt',
        shopname: 'YELLOW',
        picture: require('../assets/Images/shirt.png'),
        price: 500,
        rating: 4.5,
        description: "This is a nice shirt, ples buy",
        colors: ['black', 'blue', 'yellow'],
        sizes: ['S, M, L, XL, XXL']

    },
    {
        id: '9',
        name: 'Shirt',
        shopname: 'YELLOW',
        picture: require('../assets/Images/shirt.png'),
        price: 500,
        rating: 4.5,
        description: "This is a nice shirt, ples buy",
        colors: ['black', 'blue', 'yellow'],
        sizes: ['S, M, L, XL, XXL']

    },
    {
        id: '10',
        name: 'Shirt',
        shopname: 'YELLOW',
        picture: require('../assets/Images/shirt.png'),
        price: 500,
        rating: 4.5,
        description: "This is a nice shirt, ples buy",
        colors: ['black', 'blue', 'yellow'],
        sizes: ['S, M, L, XL, XXL']

    },
    {
        id: '11',
        name: 'Shirt',
        shopname: 'YELLOW',
        picture: require('../assets/Images/shirt.png'),
        price: 500,
        rating: 4.5,
        description: "This is a nice shirt, ples buy",
        colors: ['black', 'blue', 'yellow'],
        sizes: ['S, M, L, XL, XXL']

    }
]

export default PRODUCTS