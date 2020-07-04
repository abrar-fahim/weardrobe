# weardrobe

run npm start on App folder

Add web and other folders to keep seperate components organized


**TODO**
- [x] decide on shop screen and profile screen top tab layout
- [ ] in reviews, some reviews might be too big, so maybe give snippet at first, then click to expand (not important) // just simply hide in front end and add a "see more" button to expand.
- [x] add iters to everything
- [ ] clicking on picture in chats/product page leads to zoomable pic page
- [x] add pop up warnings before deleting posts, blogs, groups
- [x] integrate dp in get followers/ following of self and others profiles
- [x] clicking on dp in chat screen leads to user profile
- [ ] think about adding iter to get cart and get wishlist
- [ ] reduce font size of product list dynamically when price is too large to show
- [ ] emojis dont work in chat
- [x] improve cart ui
- [x] update cart when deleting cart item
- [x] figure out a way to implement both isLoading and isrefreshing
- [ ] resolve a couple of products in get shopping sessions to show in session name in list
- [x] share a product or shop in chat/post
- [ ] fix ui of ipad
- [x] everything with blogs
- [x] delete posts, delete comments
- [ ] replace touchable opacities with native feedback if android
- [ ] update comment count even in post list screen after commenting




Known Bugs
- [x] deleting group and then navigating to group list page still shows deleted 
- [x] use keyboard avoiding view on ios in group chat screen
- [ ] going to profile info on your own profile by tapping dp on your posts goes to other profile screen in magazione tab
- [ ] fix send photos to shop chat while chatting via modal from seller screen
- [ ] clicking on talk about in shopping session screen pushes a new chat screen to stack, it should go back to existing stack screen
- [ ] on ios, clicking on review box to type input doesnt automatically push screen upwards to avoid keyboard, even though the keyboard is avoided when swiping up

Testing
- [ ] need to check iters working properly for product/shop reviews

Optimizations
- [ ] dont make api call on every end reached once you find empty array from server
- [ ] make fetch content more optimized by having a isUpdated variable in redux store (currently updates screen content every time screen comes to focus)
- [ ] optimize search api calls (dont do it on every key stroke, maybe do some checks first), here maybe send keystrokes every 300ms or so

- [x] optimize chats api calls