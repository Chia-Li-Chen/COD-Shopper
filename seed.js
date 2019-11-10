const db = require('./server/db/index')
// const {green, red} = require('chalk')
// import datetime

const {User} = require('./server/db/models/models_index')
const {Product} = require('./server/db/models/models_index')
const {Order} = require('./server/db/models/models_index')
const {OrderToItem} = require('./server/db/models/models_index')
// OrderItems
//   -
//   orderId int FK > - Order.orderId
// productId int FK > - Product.productId

// PaymentInfo
// -----
//   paymentInfoId int PK
// user int FK > - User.userId
// paymentType int FK > - PaymentType.paymentTypeId

// PaymentType
// ----
//   paymentTypeId int PK
// name string

// Shipment
// ----
//   shipmentId PK int

// OrderStatus
// ----
//   OrderStatusId PK int
// name UNIQUE string

// User
//   -
//   userId PK int
// email string
// password  string
// firstName string
// lastName  string
// phoneNumber string
// group int FK > - Group.groupId = ** userRole

const users = [
  {
    email: 'DT@monkeybarnewyork.com',
    password: '123456',
    firstName: 'David',
    lastName: 'Tanis',
    phoneNumber: '212-288-1010'
  },
  {
    email: 'KN@sugarfishsushi.com',
    password: '123456',
    firstName: 'Kazunori',
    lastName: 'Nozawa',
    phoneNumber: '347-705-8100'
  },
  {
    email: 'SC@fusconewyork.com',
    password: '123456',
    firstName: 'Scott',
    lastName: 'Conant',
    phoneNumber: '212-777-5314'
  },
  {
    email: 'GA@aviarynyc.com',
    password: '123456',
    firstName: 'Grant',
    lastName: 'Achatz',
    phoneNumber: '212-805-8800'
  },
  {
    email: 'JG@carminesnyc.com',
    password: '123456',
    firstName: 'Jeff',
    lastName: 'Gotta',
    phoneNumber: '212-221-3800'
  },
  {
    email: 'GG@eonsgreek.com',
    password: '123456',
    firstName: 'George',
    lastName: 'Georgiades',
    phoneNumber: '212-696-1234'
  },
  {
    email: 'JN@rauschenbergfoundation.org',
    password: '123456',
    firstName: 'Jason',
    lastName: 'Neve',
    phoneNumber: '212-228-5283'
  },
  {
    email: 'MN@sensakana.com',
    password: '123456',
    firstName: 'Mina',
    lastName: 'Newman',
    phoneNumber: '212-221-9560'
  },
  {
    email: 'VS@sevaindianrestaurant.com',
    password: '123456',
    firstName: 'Vinod',
    lastName: 'Sharma',
    phoneNumber: '718-626-4440'
  },
  {
    email: 'RB@aurorabk.com',
    password: '123456',
    firstName: 'Riccardo',
    lastName: 'Buitoni',
    phoneNumber: '718-388-5100'
  },
  {
    email: 'GT@delfriscos.com',
    password: '123456',
    firstName: 'Guillaume',
    lastName: 'Thivet',
    phoneNumber: '212- 575-5129'
  },
  {
    email: 'KY@jukunyc.com',
    password: '123456',
    firstName: 'Kazuo',
    lastName: 'Yoshida',
    phoneNumber: '646-590-2111'
  },
  {
    email: 'DB@landthaikitchen.com',
    password: '123456',
    firstName: 'David',
    lastName: 'Bank',
    phoneNumber: '212-501-8121'
  },
  {
    email: 'LB@esca-nyc.com',
    password: '123456',
    firstName: 'Lidia',
    lastName: 'Bastianich',
    phoneNumber: '212-564-7272'
  },
  {
    email: 'AB@patinagroup.com',
    password: '123456',
    firstName: 'Andy',
    lastName: 'Bennett',
    phoneNumber: '212-332-7610'
  }
]

// Group
// ----
//   groupId int PK
// name string

// ** group = userRole, name = role

// const userRole = [{
//   role: 'regularUser',
// }, {
//   role: 'admin',
// },];

// Order
//   -
// userId int FK > - User.UserID
// orderId PK int
// orderStatusId int FK > - OrderStatus.orderStatusId
// orderDate datetime
// totalPrice decimal
// shipmentint FK > - Shipment.shipmentId
// paymentInfo int FK > - PaymentInfo.paymentInfoId

const orders = [
  {
    userId: 1,
    orderSubmittedDate: Date.now() - 15,
    totalPrice: 10000
  },
  {
    userId: 2,
    orderSubmittedDate: null,
    totalPrice: 20000
  }
]

const orderProducts = [
  {
    orderId: 1,
    productId: 2,
    quantity: 3
  },
  {
    orderId: 1,
    productId: 3,
    quantity: 2
  },
  {
    orderId: 1,
    productId: 6,
    quantity: 1
  },
  {
    orderId: 1,
    productId: 4,
    quantity: 1
  },
  {
    orderId: 1,
    productId: 5,
    quantity: 2
  }
]

// const order = [{
//   userId: 3,
//   orderStatusId: 3,
//   orderDate: Date.now() - 13,
//   totalPrice: 550.00,
//   shipment: 3,
//   paymentInfo: 1,
// }, {
//   userId: 4,
//   orderStatusId: 1,
//   orderDate: Date.now() - 12,
//   totalPrice: 550.00,
//   shipment: 4,
//   paymentInfo: 1,
// }, {
//   userId: 5,
//   orderStatusId: 2,
//   orderDate: Date.now() - 11,
//   totalPrice: 550.00,
//   shipment: 5,
//   paymentInfo: 1,
// }, {
//   userId: 6,
//   orderStatusId: 3,
//   orderDate: Date.now() - 10,
//   totalPrice: 550.00,
//   shipment: 6,
//   paymentInfo: 1,
// }, {
//   userId: 7,
//   orderStatusId: 1,
//   orderDate: Date.now() - 9,
//   totalPrice: 550.00,
//   shipment: 7,
//   paymentInfo: 1,
// }, {
//   userId: 8,
//   orderStatusId: 2,
//   orderDate: Date.now() - 8,
//   totalPrice: 550.00,
//   shipment: 8,
//   paymentInfo: 1,
// }, {
//   userId: 9,
//   orderStatusId: 3,
//   orderDate: Date.now() - 7,
//   totalPrice: 550.00,
//   shipment: 9,
//   paymentInfo: 1,
// }, {
//   userId: 10,
//   orderStatusId: 1,
//   orderDate: Date.now() - 6,
//   totalPrice: 550.00,
//   shipment: 10,
//   paymentInfo: 1,
// }, {
//   userId: 11,
//   orderStatusId: 2,
//   orderDate: Date.now() - 5,
//   totalPrice: 550.00,
//   shipment: null,
//   paymentInfo: 1,
// }, {
//   userId: 12,
//   orderStatusId: 3,
//   orderDate: Date.now() - 4,
//   totalPrice: 550.00,
//   shipment: null,
//   paymentInfo: 1,
// }, {
//   userId: 13,
//   orderStatusId: 1,
//   orderDate: Date.now() - 3,
//   totalPrice: 550.00,
//   shipment: null,
//   paymentInfo: 1,
// }, {
//   userId: 14,
//   orderStatusId: 2,
//   orderDate: Date.now() - 2,
//   totalPrice: 550.00,
//   shipment: null,
//   paymentInfo: 1,
// }, {
//   userId: 15,
//   orderStatusId: 3,
//   orderDate: Date.now() - 1,
//   totalPrice: 550.00,
//   shipment: null,
//   paymentInfo: 1,
// },];

// Product  # Table documentation comment 2
// ------------
//   productId PK int
// # Field documentation comment 1
// # Field documentation comment 2
// imageUrl string
// name varchar(200) UNIQUE # Field documentation comment 3
// price money
// description text
// productGroup int FK > - productGroup.productGroupId
// inventory int
// isFeatured boolean

// productGroup
// -------
//   productGroupId int PK
// name string

const products = [
  {
    name: 'Bass - Black Sea, Fresh, Wild, USA, Whole, Cleaned (3lb avg)',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/b/l/black-sea-bass-large-wild-3lb.jpg',
    price: 5500,
    description:
      'The Black Sea Bass is legendary for its delicate flavor, moderately firm texture and small white flakes. That makes it a favorite for anyone who enjoys Sea Trout, Spot and Snapper. Bake, steam, fry, sauté or poach this buttery, tender fish, but never overpower it with strong herbs or spices. Instead, a bit of citrus, as well as fresh mushrooms and tomatoes, will compliment it beautifully. Healthy as it is delicious, the Sea bass provides a good source of Magnesium and Phosphorus, and an excellent source of Protein, Vitamin B6 and Selenium.',
    inventory: 20,
    isFeatured: false
  },
  {
    name: 'Bass - Hybrid Striped, Fresh, Farmed, USA, Whole, Cleaned (3lb avg)',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/h/y/hybrid-striped-bass-farmed-head-on.jpg',
    price: 4500,
    description:
      'Distinguished from regular Striped Bass by its broken – instead of horizontal – stripes, the Hybrid Striped Bass is best known for its firm texture and white, flaky sweet meat. If you’re a fan of Snapper or Tilapia, you’ll love this fish! The firm texture of the Hybrid Striped Bass makes it a natural for grilling – skin on for optimal moistness. You’ll also enjoy stuffing it with a crabmeat dressing, or baking it whole with sliced lemons and your favorite fresh herbs. Healthy lifestylers will appreciate this great source of low-fat protein and Omega-3 fatty acids, as well as a good source of various vitamins and minerals.',
    inventory: 21,
    isFeatured: true
  },
  {
    name: 'Bronzini - Mediterranean, Fresh, Farmed, Whole Cleaned (1lb avg)',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/t/w/two-mediterranean-bronzini-farmed-cleaned-1lb.jpg',
    price: 1500,
    description:
      'The silver skinned Bronzini is a fish with a history, since it’s been enjoyed in the Mediterranean for thousands of years. It’s no wonder! Almost everyone enjoys its velvety texture and sweet, mild flavor. Perfect for those not accustomed to strong seafood flavors. Bronzini’s mildness makes it ideal for baking, broiling, steaming, poaching, sautéing, or grilling. We especially like roasting it whole with lemons, parsley and fennel. Keep seasonings and sauces light, so the mild taste is not overpowered. This Mediterranean favorite offers a good source of Vitamins A, C and B6, as well as Calcium, Iron, Potassium and Selenium.',
    productGroupId: 1,
    inventory: 22,
    isFeatured: true
  },
  {
    name: 'Chilean Sea Bass - Frozen, Wild, Chile',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/3/1/3140.jpg',
    price: 2445,
    description:
      'The high fat content of the Chilean Sea Bass gives it a rich, unique flavor. What’s more, the luxurious texture with large, white flakes almost melts in your mouth! If you like Sablefish or Black Cod, this one’s for you! Chilean Sea Bass does very well on the grill. You may also broil, poach, sauté or steam it with delicious results. It possesses a substantial enough flavor to hold up to bolder flavors, like olives, capers and garlic, so be creative and enjoy. Chilean Sea Bass is a terrific source of protein, as well as a good source of Omega-3 fatty acid.',
    productGroupId: 1,
    inventory: 23,
    isFeatured: false
  },
  {
    name: 'Blackfish - Tautog, Fresh, Wild, USA, Whole (4lb avg)',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/6/4/6483.jpg',
    price: 4668,
    description:
      'The Blackfish may not be so prettiest fish in the ocean, but it is one of the tastiest! This fresh Blackfish is a favorite for many because of its perfectly firm, white and mild-flavored meat, similar to the more popular Cod, Sea Bass, or Halibut. We love Blackfish in fish chowder because its firm, meaty texture holds its own. It’s versatile, though, so feel free to bake, broil or sauté it as well. It is mild, so don’t overpower it with bold spices or rich sauces. Blackfish is very high in protein, Calcium, Iron, Phosphorus, and Vitamin A. So eat as much as you want!',
    inventory: 24,
    isFeatured: false
  },
  {
    name: 'Blowfish - Fresh, Wild, USA, Cleaned Tails (5lb Bag)',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/1/2/124.jpg',
    price: 10625,
    description:
      'These Blowfish, or Northern Puffers, are club-shaped with a grayish-brownish color and yellow or white belly. Its white meat is light, delicate and very sweet in flavor. If you like the taste of White Perch or Sea Bass, you’ll love it. Given the sweet, mild flavor of Blowfish, simple preparation is best. We recommend lightly coating it with flour and sautéing it in butter, with a finishing squeeze of lemon juice. You may also bake, broil or poach it with mild seasonings. Blowfish are a great source of protein, Potassium and Phosphorus, and a good source of Calcium.',
    inventory: 10,
    isFeatured: false
  },
  {
    name: 'Bluefish - Fresh, Wild, USA, Whole (3lb avg)',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/b/l/bluefish-wild-whole.jpg',
    price: 1800,
    description:
      'A true seafood lover’s pick, Bluefish is known for its rich, pronounced flavor. It has a fatty, fine-textured flesh that ranges in color from white to silver grey. If you like Blue Runners or Mackerel, this fish is for you! The fine-textured flesh of Bluefish makes it a good candidate for baking and broiling, or grilling in aluminum foil. Its flavor is bold, so be assertive and pair it with strong flavors like garlic, oregano and Creole seasonings. Healthy diets should include Bluefish, which is high in Omega-3 and is a good source of Selenium, Niacin, Vitamin B12, Magnesium, and Potassium.',
    inventory: 25,
    isFeatured: false
  },
  {
    name: 'Butterfish - Fresh, Wild, USA, Whole',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/2/5/2585.jpg',
    price: 650,
    description:
      'Butterfish may be small and flat (about 8 ounces), but they are a big hit for those who prefer a delicate seafood taste. Our butterfish for sale is a high-fat fish with a very tender, smooth texture and a rich, sweet flavor similar to butter! The tender texture and sweet flavor of butterfish make it ideal for broiling and baking. You can also gently sauté it with a dusting of flour, finishing it off with a squeeze of lemon and fresh flat leaf parsley. Thanks to their miniature size, most chefs do not even bother filleting them! Keeping it simple is best when preparing butterfish. When you buy butterfish, you will receive a good source of protein, vitamin A, calcium, potassium, and iron.',
    inventory: 26,
    isFeatured: true
  },
  {
    name: 'Catfish - Channel, Fresh, Wild, USA, Fillet (3lb avg)',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/1/3/139m.jpg',
    price: 3666,
    description:
      'Our fresh catfish for sale is considered the best eating of the species. Channel catfish has a distinctive taste that is most often described as sweet and mild flavored with a firm, moist flesh that has less flake than other whitefish. Because of its firm flesh and less flake, seafood lovers prepare channel catfish in a wide variety of styles, so feel free to bake, broil, grill, poach, sauté, or deep/pan fry it to your liking. It’s also extremely well-suited for light soups and stews. Eating catfish is a smart source of high quality protein, as well as omega-3 and omega-6 fatty acids, covering a wide assortment of health benefits from heart, eye, and brain health to reduced inflammation. Catfish, like most seafood, has a low calorie count and fat content and contains no carbs, making it an ideal choice for most diet plans.',
    inventory: 27,
    isFeatured: true
  },
  {
    name: 'Cod - Atlantic, Market, Fresh, Wild, USA, Whole, Cleaned (6lb avg)',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/7/6/767m.jpg',
    price: 6000,
    description:
      'A bit sweeter than their Pacific cousins, Atlantic Cod has a lean, flaky yet somewhat dense flesh that is mild but distinctive in flavor. These are “market size,” from 2½ - 10lbs. If you enjoy Pollock, Haddock and Hake, be sure to include Atlantic Cod on your menu too. Atlantic Cod is extremely versatile to prepare. You may bake, broil, steam, poach or sauté it, keeping herbs, spices and sauces subtle. Also try frying it in a light batter for a delicious Fish n Chips entrée. Atlantic Cod is versatile nutrition-wise, as well. It’s high in protein and a good source of Vitamins A, C, B6, B12, and Omega-3 fatty acids.',
    inventory: 28,
    isFeatured: true
  },
  {
    name: 'Cod - Black, Fresh, Wild, USA, Head Off, Cleaned (5lb avg)',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/b/l/black-cod-wild-head-off-cleaned.jpg',
    price: 10000,
    description:
      'Considered a delicacy in many countries, the silky-white flesh of the Black Cod is soft-textured and mildly flavored. When cooked, its flaky texture is similar to Chilean Sea Bass. The delectable meat of Black Cod has a high fat content, so it can be prepared in a variety of ways, including baking, grilling, smoking, broiling and frying. Although fatty, the flavor is mellow and rich, so we suggest a minimal amount of spices, herbs or sauces. Black Cod is high in long-chain Omega 3 fatty acids, just about as much as wild salmon. It’s also a good source of Vitamin A and Iron.',
    inventory: 11,
    isFeatured: false
  },
  {
    name: 'Flounder - Fresh, Wild, USA, Whole (2lb avg)',
    imageUrl:
      'https://shop.fultonfishmarket.com/media/catalog/product/cache/2/image/500x375/9df78eab33525d08d6e5fb8d27136e95/5/0/5047.jpg',
    price: 2445,
    description:
      'Dull brown in color with reddish brown blotches, Flounder is considered to be the most popular of flatfish. It is easily enjoyed by those who like a fish with lean, firm, white meat and a clean, subtle flavor. You’ll find it similar to Fluke, Sole or Dab. Firmly textured Flounder is versatile in the kitchen. Prepare it whole by broiling, baking or steaming it. Or fillet it and sauté or pan-fry it. Milder seasonings and sauces work best. Remember, overcooking may dry it out. Low in fat, Flounder is also a very good source of protein, Niacin, B Vitamins, Phosphorus, Calcium and Selenium.',
    inventory: 29,
    isFeatured: false
  }
]

const cartItems = [
  {
    productId: 1,
    orderId: 2,
    quantity: 1
  },
  {
    productId: 2,
    orderId: 1,
    quantity: 5
  }
]

// seed your database here!
const seed = async () => {
  try {
    await db.sync({force: true})
    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )

    await Promise.all(
      orders.map(order => {
        return Order.create(order)
      })
    )

    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )

    await Promise.all(
      orderProducts.map(orderProduct => {
        return OrderToItem.create(orderProduct)
      })
    )

    // console.log(green('Seeding success!'))
    console.log('Seeding success!')
    db.close()
  } catch (err) {
    // console.error(red('Oh noes! Something went wrong!'))
    console.error('Oh noes! Something went wrong!')
    console.error(err)
    db.close()
  }
}

seed()
