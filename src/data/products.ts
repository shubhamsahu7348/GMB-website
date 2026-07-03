import { Product, Category, Coupon, BlogPost, Testimonial } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'mithai',
    name: 'Mithai',
    description: 'Traditional handcrafted sweets crafted with organic ingredients and rich heritage.',
    iconName: 'Candy',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'milk-sweets',
    name: 'Milk Sweets',
    description: 'Luscious, creamy milk sweets prepared by slowly caramelizing pure organic milk.',
    iconName: 'Milk',
    image: 'https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'dry-fruit',
    name: 'Dry Fruit Sweets',
    description: 'Exquisite, sugar-conscious blocks loaded with premium dates, almonds, pistachios, and cashews.',
    iconName: 'Nut',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bengali-sweets',
    name: 'Bengali Sweets',
    description: 'Spongy, moist, and delightfully light sweets made with pure fresh chhena and cardamom syrup.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'kaju-specials',
    name: 'Kaju Specials',
    description: 'Silky, diamond-cut premium cashew pastes enriched with real saffron and edible silver foil.',
    iconName: 'Crown',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'chocolate',
    name: 'Chocolate Sweets',
    description: 'A harmonious fusion of dense traditional fudge and premium dark cocoa bars.',
    iconName: 'Cookie',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'namkeen',
    name: 'Premium Namkeen',
    description: 'Spicy, savory, and extra crunchy mixtures fried in premium pure peanut oils.',
    iconName: 'Flame',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'cookies',
    name: 'Desi Ghee Cookies',
    description: 'Crisp, melting buttery baked goods loaded with pistachios and roasted almond shards.',
    iconName: 'Wheat',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'chikki',
    name: 'Gur & Nut Chikki',
    description: 'Crunchy winter brittles prepared with organic jaggery and premium hand-peeled groundnuts.',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gift-boxes',
    name: 'Luxury Gift Boxes',
    description: 'Exquisitely printed packaging lined with gold foil, perfect for wedding and festival gifting.',
    iconName: 'Gift',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'festival-specials',
    name: 'Festival Specials',
    description: 'Limited edition sweets created in celebratory seasons using pure rich saffron and rose water.',
    iconName: 'PartyPopper',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sugar-free',
    name: 'Sugar-Free Sweets',
    description: 'Diabetic-safe recipes sweetened naturally with premium quality dates, figs, and stevia extract.',
    iconName: 'Heart',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=400&q=80'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'kaju-katli',
    name: 'Premium Kaju Katli',
    description: 'Classic diamond-cut delight made from select premium cashews and organic raw sugars, glazed with authentic edible silver foil (Vark). Melt-in-your-mouth texture that epitomizes royal Indian hospitality.',
    category: 'kaju-specials',
    price: 450, // base price for 500g
    discountPercent: 10,
    rating: 4.9,
    ratingCount: 1240,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Select Cashews', 'Organic Sugar', 'Water', 'Edible Silver Foil', 'Saffron hint'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['Bestseller', 'Pure Ghee', 'Festive'],
    shelfLife: '30 Days',
    reviews: [
      { id: 'r1', userName: 'Ananya Sharma', rating: 5, comment: 'Absolutely perfect sweetness and so soft. Truly premium cashews!', date: '2026-06-15' },
      { id: 'r2', userName: 'Rajesh Gupta', rating: 5, comment: 'The best Kaju Katli I have tasted in years. Authentic silver foil and top texture.', date: '2026-06-20' }
    ]
  },
  {
    id: 'motichoor-laddu',
    name: 'Saffron Motichoor Laddu',
    description: 'Heavenly golden spheres rolled from tiny gram flour pearls fried in 100% pure organic Desi Ghee, infused with pure Kashmiri saffron strands, melon seeds, and fragrant green cardamom.',
    category: 'mithai',
    price: 350,
    discountPercent: 0,
    rating: 4.8,
    ratingCount: 950,
    stock: 65,
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Gram Flour (Besan)', 'Pure Desi Ghee', 'Saffron Strands', 'Melon Seeds', 'Cardamom', 'Raw Sugar'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['Bestseller', 'Pure Ghee', 'Festive'],
    shelfLife: '10 Days',
    reviews: [
      { id: 'r3', userName: 'Amit Mehra', rating: 5, comment: 'Rich in pure ghee, melts instantly. Packaging is extremely luxurious.', date: '2026-06-18' }
    ]
  },
  {
    id: 'milk-cake',
    name: 'Rich Alwar Milk Cake',
    description: 'An iconic grainy, golden-brown fudge sweet prepared by hours of slow-caramelizing rich buffalo milk, curdled perfectly, and laced with cardamoms and ghee. Dense, moist, and absolute comfort.',
    category: 'milk-sweets',
    price: 400,
    discountPercent: 15,
    rating: 4.7,
    ratingCount: 820,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Pure Full Cream Milk', 'Organic Sugar', 'Pure Desi Ghee', 'Cardamom', 'Lemon Juice'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['Bestseller', 'Pure Ghee'],
    shelfLife: '12 Days',
    reviews: [
      { id: 'r4', userName: 'Vikram Malhotra', rating: 4, comment: 'The caramelized center was perfectly grainy and sweet. High quality milk!', date: '2026-06-25' }
    ]
  },
  {
    id: 'bengali-rasgulla',
    name: 'Sponge Bengali Rasgulla',
    description: 'Light, spongy spheres of fresh milk chhena kneaded carefully and boiled in light hot cardamom-infused organic sugar syrup. Incredibly juicy, cooling, and absolutely legendary.',
    category: 'bengali-sweets',
    price: 280,
    discountPercent: 5,
    rating: 4.9,
    ratingCount: 1100,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Fresh Chhena (Cottage Cheese)', 'Sugar Syrup', 'Rose Water', 'Cardamom Powder'],
    weightOptions: ['500g', '1kg'],
    weightMultipliers: { '500g': 1.0, '1kg': 1.85 },
    tags: ['Bestseller', 'New'],
    shelfLife: '5 Days',
    reviews: [
      { id: 'r5', userName: 'Debashree Sen', rating: 5, comment: 'Very soft and juicy. Exactly like the authentic ones from Kolkata!', date: '2026-06-28' }
    ]
  },
  {
    id: 'kesar-gulab-jamun',
    name: 'Royal Kesar Gulab Jamun',
    description: 'Golden-fried khoya dumplings stuffed with real pistachios and saffron strands, soaked completely in a rich, warm syrup flavored with premium rose water, cardamoms, and saffron.',
    category: 'mithai',
    price: 320,
    discountPercent: 10,
    rating: 4.9,
    ratingCount: 1540,
    stock: 55,
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Khoya (Reduced Milk)', 'Chenna', 'Maida', 'Kashmiri Saffron', 'Pistachios', 'Rose Syrup'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['Bestseller', 'Festive'],
    shelfLife: '8 Days',
    reviews: [
      { id: 'r6', userName: 'Sunita Rao', rating: 5, comment: 'We served these at our anniversary party. Guests were asking where they came from!', date: '2026-06-22' }
    ]
  },
  {
    id: 'dry-fruit-barfi',
    name: 'Sugar-Free Dry Fruit Barfi',
    description: 'A completely natural, diabetic-safe energetic bar compiled from pure hand-cut Arabian dates, soft figs, toasted almonds, premium cashew shards, and Iranian green pistachios, bound together with pure Desi Ghee.',
    category: 'sugar-free',
    price: 600,
    discountPercent: 12,
    rating: 4.8,
    ratingCount: 670,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Arabian Dates', 'Organic Dried Figs', 'Almonds', 'Cashews', 'Walnuts', 'Pistachios', 'Pure Ghee'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['Bestseller', 'Sugar-Free', 'Pure Ghee'],
    shelfLife: '45 Days',
    reviews: [
      { id: 'r7', userName: 'Karan Johar', rating: 5, comment: 'Incredible flavor and absolutely no added sugar! Perfect for health conscious people.', date: '2026-06-12' }
    ]
  },
  {
    id: 'kesar-peda',
    name: 'Fragrant Kesar Peda',
    description: 'Traditional Mathura-style thick pedas made of semi-dry reduced milk solids, blended beautifully with real Spanish saffron and cardamom, then hand-molded into royal circular medallions.',
    category: 'milk-sweets',
    price: 340,
    discountPercent: 0,
    rating: 4.7,
    ratingCount: 580,
    stock: 70,
    image: 'https://images.unsplash.com/photo-1601356616077-695728ecf769?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Fresh Khoya', 'Sugar', 'Pure Saffron Strands', 'Green Cardamom Powder', 'Pistachio toppings'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['Pure Ghee', 'Festive'],
    shelfLife: '15 Days',
    reviews: [
      { id: 'r8', userName: 'Priya Patel', rating: 5, comment: 'Perfect melt, rich texture, and a beautiful saffron aroma. Reminds me of Varanasi!', date: '2026-06-30' }
    ]
  },
  {
    id: 'soan-papdi',
    name: 'Flaky Desi Ghee Soan Papdi',
    description: 'Extremely light, multi-layered fibrous sweet that crumbles elegantly in your mouth. Prepared from roasted chickpea flour in pure ghee, cardamom, and generously garnished with slivered almonds and pistachios.',
    category: 'mithai',
    price: 300,
    discountPercent: 10,
    rating: 4.6,
    ratingCount: 490,
    stock: 90,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Besan (Gram Flour)', 'All-Purpose Flour', 'Pure Desi Ghee', 'Sugar Syrup', 'Almonds', 'Pistachios'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['Pure Ghee', 'Festive'],
    shelfLife: '60 Days',
    reviews: []
  },
  {
    id: 'chocolate-burfi',
    name: 'Cocoa Fudge Chocolate Burfi',
    description: 'Double-layered perfection featuring a rich bottom layer of traditional dense vanilla milk khoya, crowned by a rich, indulgent top layer of premium Belgian cocoa-blended fudge.',
    category: 'chocolate',
    price: 380,
    discountPercent: 8,
    rating: 4.8,
    ratingCount: 430,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Reduced Milk (Khoya)', 'Belgian Cocoa Powder', 'Organic Sugar', 'Pure Ghee', 'Silver Foil glaze'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['New', 'Pure Ghee'],
    shelfLife: '14 Days',
    reviews: [
      { id: 'r9', userName: 'Rahul Verma', rating: 5, comment: 'Kids absolute favorite! The fusion of mawa and dark chocolate is brilliant.', date: '2026-06-29' }
    ]
  },
  {
    id: 'dry-fruit-ladoo',
    name: 'Royal Dry Fruit & Gond Ladoo',
    description: 'Immunity-boosting nutritious globes compiled from edible natural acacia gum (Gond), loaded with roasted cashews, walnuts, almonds, and organic jaggery. Prepared in massive cauldrons of hot pure Desi Ghee.',
    category: 'dry-fruit',
    price: 550,
    discountPercent: 5,
    rating: 4.9,
    ratingCount: 710,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Acacia Gum (Gond)', 'Toasted Almonds', 'Organic Jaggery', 'Pure Desi Ghee', 'Cashew chunks', 'Melon seeds'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['Bestseller', 'Pure Ghee', 'Festive'],
    shelfLife: '90 Days',
    reviews: []
  },
  {
    id: 'gokul-festive-hampers',
    name: 'Royal Gokul Golden Gift Box',
    description: 'Our flagship printed golden drawer box holding a premium assortment of Kaju Katli, Saffron Laddu, Dry Fruit Barfi, and roasted salted cashews. Elegant gift choice for weddings, anniversaries, and Diwali.',
    category: 'gift-boxes',
    price: 850,
    discountPercent: 15,
    rating: 5.0,
    ratingCount: 2200,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Assorted sweets (Kaju Katli, Laddus, Dry Fruit Barfi)', 'Salted Cashews', 'Salted Almonds'],
    weightOptions: ['1 Box (1.2kg)', 'Twin Packs (2.4kg)'],
    weightMultipliers: { '1 Box (1.2kg)': 1.0, 'Twin Packs (2.4kg)': 1.85 },
    tags: ['Bestseller', 'Festive'],
    shelfLife: '30 Days',
    reviews: [
      { id: 'r10', userName: 'Sanjay Dutt', rating: 5, comment: 'The drawer-style box is extremely sturdy and looks deeply luxurious. The sweets inside are fresh and heavenly.', date: '2026-06-27' }
    ]
  },
  {
    id: 'kaju-pista-roll',
    name: 'Saffron Kaju Pista Roll',
    description: 'Double layer cylindrical roll crafted with premium cashew dough wrapped elegantly around a central sweet green pistachio fudge layer, glazed with edible silver foil and saffron hints.',
    category: 'kaju-specials',
    price: 500,
    discountPercent: 10,
    rating: 4.8,
    ratingCount: 390,
    stock: 42,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Cashews', 'Green Pistachios', 'Organic Sugar', 'Edible Silver Foil', 'Saffron'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['Pure Ghee', 'Festive'],
    shelfLife: '20 Days',
    reviews: []
  },
  {
    id: 'spicy-kaju-mixture',
    name: 'Shahi Spicy Kaju Mixture',
    description: 'The ultimate royal savory snack! Crispy fried chickpea noodles, toasted almonds, cashew nuts, raisins, and aromatic spices tossed together to make a sweet, spicy, and tangy crunchy mixture.',
    category: 'namkeen',
    price: 220,
    discountPercent: 0,
    rating: 4.9,
    ratingCount: 880,
    stock: 110,
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Peanut Oil', 'Besan flour', 'Premium Cashews', 'Toasted Almonds', 'Black Raisins', 'Rock Salt', 'Chili Spices'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['Bestseller'],
    shelfLife: '90 Days',
    reviews: []
  },
  {
    id: 'pista-ghee-cookies',
    name: 'Royal Pistachio Ghee Cookies',
    description: 'Crisp, aromatic, traditional eggless biscuits made with stone-ground wheat flour, rich organic Desi Ghee, and overloaded with crunchy slivered Iranian pistachios and cardamom.',
    category: 'cookies',
    price: 180,
    discountPercent: 5,
    rating: 4.7,
    ratingCount: 320,
    stock: 75,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Wheat Flour', 'Pure Desi Ghee', 'Slivered Pistachios', 'Cardamom', 'Raw cane sugar'],
    weightOptions: ['250g', '500g'],
    weightMultipliers: { '250g': 0.6, '500g': 1.0 },
    tags: ['New', 'Pure Ghee'],
    shelfLife: '60 Days',
    reviews: []
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'GOKUL10',
    discountPercent: 10,
    maxDiscount: 200,
    description: 'Flat 10% OFF on your first order. Laced with tradition!',
    minOrderAmount: 400,
    expiryDate: '2027-12-31',
    active: true
  },
  {
    code: 'FESTIVEGOLD',
    discountPercent: 15,
    maxDiscount: 500,
    description: 'Get 15% OFF on luxury Gift Boxes & Festival Specials! Order above ₹1000.',
    minOrderAmount: 1000,
    expiryDate: '2026-11-30',
    active: true
  },
  {
    code: 'GHEELOVE',
    discountPercent: 8,
    maxDiscount: 150,
    description: 'Extra 8% discount on Bestsellers above ₹500.',
    minOrderAmount: 500,
    expiryDate: '2026-12-31',
    active: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Royal History of Indian Mithai',
    excerpt: 'Trace the fascinating origin of Kaju Katli, Ladoos, and Bengali Rasgullas through historical dynasties and ancient scriptures.',
    content: 'Indian sweets, collectively known as Mithai, have a deep-seated spiritual and cultural history spanning over five millennia. Historically, sweets were designed as pure offerings (Prasad) to deities, utilizing pure cows milk, clarified butter (Ghee), and natural honey. It was during the Mughal era that complex confectioneries like Kaju Katli (influenced by Persian marzipan) and flavored Halwas gained prominence in royal courts, decorated with edible gold and silver foil (Vark) to indicate luxury. In Bengal, the 19th-century cheese-confectionery revolution introduced spongy Rasgullas and Sandesh, permanently shaping India\'s diverse sweet palate. Today, Gokul Mishthan Bhandar preserves these ancient culinary manuscripts, reproducing royal recipes using pure ingredients to deliver genuine, nostalgic tradition.',
    date: 'June 24, 2026',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    author: 'Pandit Devendra Shastri',
    readTime: '5 mins read',
    tags: ['Heritage', 'Tradition', 'Mithai']
  },
  {
    id: 'b2',
    title: 'Why Pure Desi Ghee is Good for Your Health',
    excerpt: 'Uncover the scientific benefits of Clarified Butter (Desi Ghee) and why it remains the cornerstone of Indian cooking.',
    content: 'For decades, modern dietary trends mistakenly labeled Clarified Butter (Desi Ghee) as unhealthy. However, ancient Ayurveda and contemporary science now fully agree: pure Desi Ghee prepared via the traditional Bilona churning method is a nutritional powerhouse. Ghee contains healthy short-chain fatty acids like butyrate, which directly supports digestion and gut lining integrity. It has a high smoke point (250°C), making it the safest fat for frying and cooking. Rich in fat-soluble vitamins (A, D, E, K), Ghee improves cognitive health, joint lubrication, and boosts natural immunity. At Gokul Mishthan Bhandar, our commitment to using 100% pure premium Desi Ghee ensures that our sweets do not just taste legendary, but support wholesome wellness.',
    date: 'May 18, 2026',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. Alok Sen (Ayurvedic Expert)',
    readTime: '4 mins read',
    tags: ['Health', 'Desi Ghee', 'Ayurveda']
  },
  {
    id: 'b3',
    title: 'The Art of Handcrafting Premium Sweets',
    excerpt: 'Take a virtual tour inside Gokul Mishthan Bhandar\'s kitchen to see how master Halwais create magic daily.',
    content: 'The difference between machine-made sweets and handcrafted Mithai is immediately evident on the first bite. Confectionery-making is an exact craft passed down through generations. Our master artisans, or "Halwais", spend years learning to gauge the exact temperature of caramelized milk curd, the precise thickness of hot cardamom sugar syrups, and the perfect moisture balance in cashew doughs. Hand-kneading chenna ensures Bengali sweets remain airy and spongy, while hand-rolling Motichoor Laddus prevents oil compacting, preserving soft, succulent ghee droplets inside. We take pride in these artisan practices, rejecting automated mass production to ensure every sweet carries human warmth and unmatched culinary standard.',
    date: 'April 05, 2026',
    image: 'https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&w=600&q=80',
    author: 'Chef Shivraj Maharaj',
    readTime: '6 mins read',
    tags: ['Artistry', 'Behind the Scenes', 'Craftsmanship']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Suhasini Krishnan',
    location: 'Mumbai, India',
    rating: 5,
    comment: 'I ordered 200 custom golden gift boxes for my daughter’s wedding. Gokul Mishthan Bhandar delivered everything on time in pristine packaging. The Kaju Katli and Dry Fruit barfis were fresh, luxurious, and highly praised by all guests. Recommended 100%!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    date: 'June 10, 2026'
  },
  {
    id: 't2',
    name: 'Gaurav Kapoor',
    location: 'Delhi NCR',
    rating: 5,
    comment: 'The absolute gold standard of traditional sweets. The saffron Motichoor laddus smell of raw pure ghee and authentic cardamom. Their customer service is incredibly fast and helpful. Secure packaging made sure not a single drop of syrup leaked!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'June 22, 2026'
  },
  {
    id: 't3',
    name: 'Meenakshi Iyer',
    location: 'Bangalore, India',
    rating: 5,
    comment: 'Their Sugar-Free Dry Fruit Barfi is a blessing for health-conscious people and elders. It has a beautiful chewy date texture and rich almond bite. Order arrived within 24 hours of dispatch. Incredible effort!',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: 'June 29, 2026'
  }
];
