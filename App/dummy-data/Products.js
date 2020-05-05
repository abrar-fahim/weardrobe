class Product {

    constructor(id, name, shopname,price, picture) {
        this.id = id
        this.name = name
        this.picture = picture
        this.shopname = shopname
        this.price = price
    }
}


export const PRODUCTS = [
    new Product(1, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png') ),
    new Product(2, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png') ),
    new Product(3, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png') ),
    new Product(4, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png') ),
    new Product(5, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png') ),
    new Product(6, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png') ),
    new Product(7, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png') ),
    new Product(8, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png') ),

   
]