class FeedItem {

    constructor(id, caption, picture) {
        this.id = id
        this.caption = caption
        this.picture = picture

    }
}


export const FEEDITEMS = [
    new FeedItem(1, "i bought some nice clothes", require('../assets/Images/shirt.png')),
    new FeedItem(2, "I hate my clothes", require('../assets/Images/shirt.png')),
    new FeedItem(3, "i bought some nice clothes", require('../assets/Images/shirt.png')),
    new FeedItem(4, "i bought some nice clothes", require('../assets/Images/shirt.png')),
    new FeedItem(5, "i bought some nice clothes", require('../assets/Images/shirt.png')),
    new FeedItem(6, "i bought some nice clothes", require('../assets/Images/shirt.png')),
    new FeedItem(7, "i bought some nice clothes", require('../assets/Images/shirt.png')),
    new FeedItem(8, "i bought some nice clothes", require('../assets/Images/shirt.png')),
]