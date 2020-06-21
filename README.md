# weardrobe

run npm start on App folder

Add web and other folders to keep seperate components organized


**TODO**
- [ ] decide on shop screen and profile screen top tab layout
- [ ] in reviews, some reviews might be too big, so maybe give snippet at first, then click to expand (not important) // just simply hide in front end and add a "see more" button to expand.
- [ ] add iters to everything
- [ ] clicking on picture in chats/product page leads to zoomable pic page
- [ ] add pop up warnings before deleting posts, blogs, groups
- [ ] integrate dp in get followers/ following of self and others profiles
- [ ] clicking on dp in chat screen leads to user profile
- [ ] think about adding iter to get cart and get wishlist
- [ ] reduce font size of product list dynamically when price is too large to show
- [ ] emojis dont work in chat
- [ ] improve cart ui
- [ ] update cart when deleting cart item
- [ ] figure out a way to implement both isLoading and isrefreshing
- [ ] resolve a couple of products in get shopping sessions to show in session name in list
- [ ] share a product or shop in chat/post/blog
- [ ] fix ui of ipad



Known Bugs
- [x] deleting group and then navigating to group list page still shows deleted 
- [ ] use keyboard avoiding view on ios in group chat screen

Testing
- [ ] need to check iters working properly for product/shop reviews

Optimizations
- [ ] dont make api call on every end reached once you find empty array from server
- [ ] make fetch content more optimized by having a isUpdated variable in redux store (currently updates screen content every time screen comes to focus)
- [ ] optimize search api calls (dont do it on every key stroke, maybe do some checks first), here maybe send keystrokes every 300ms or so

- [x] optimize chats api calls