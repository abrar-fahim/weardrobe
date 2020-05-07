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


export const PRODUCTS = [
    new Product(1, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product(2, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product(3, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product(4, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product(5, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product(6, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product(7, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product(8, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product(9, "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
    new Product(10 , "Shirt", 'YELLOW', 500, require('../assets/Images/shirt.png'), "This is a nice shirt, ples buy", 4.5, "purple", "XL", "5-5-2020", 0, "Shirts", 200, "AX50S" ),
 

   
]