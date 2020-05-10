class Chat {

    constructor(id, members, chats, name) {
        this.id = id
        this.members = members
        this.chats = chats
        this.name = name

    }
}


export const CHATS = [
    new Chat('1', ["Abrar","Somik","Nafiz","Syed", "Tasin"], {
        "Abrar": "Whaddup",
        "Somik": "noice",
        "Nafiz": "les shop together ooweeee",
        "Syed": "innnn",
        "Tasin": "les do this"
    }, 'Some Benchers'),
    new Chat('2', ["Abrar","Somik","Nafiz","Syed", "Tasin"], {
        "Abrar": "Whaddup",
        "Somik": "noice",
        "Nafiz": "les shop together ooweeee",
        "Syed": "innnn",
        "Tasin": "les do this"
    }, 'Some Benchers'),
    new Chat('3', ["Abrar","Somik","Nafiz","Syed", "Tasin"], {
        "Abrar": "Whaddup",
        "Somik": "noice",
        "Nafiz": "les shop together ooweeee",
        "Syed": "innnn",
        "Tasin": "les do this"
    }, 'Some Benchers')
    

]