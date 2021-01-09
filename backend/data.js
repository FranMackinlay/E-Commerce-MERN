import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Francisco',
      email: 'admin@amazona.com',
      password: bcrypt.hashSync('1234', 8),
      flags: {
        isAdmin: true,
      }
    },
    {
      name: 'Carla',
      email: 'carla@gmail.com',
      password: bcrypt.hashSync('1234', 8),
      flags: {
        isAdmin: false,
      }
    },
  ],
  products: [
    {
      name: 'Nike Slim Shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',

    },
    {
      name: 'Adidas Slim Shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 80,
      countInStock: 5,
      brand: 'Nike',
      rating: 3.5,
      numReviews: 10,
      description: 'high quality product',

    },
    {
      name: 'Topper Slim Shirt',
      category: 'Shirts',
      image: '/images/p3.jpg',
      price: 110,
      countInStock: 30,
      brand: 'Nike',
      rating: 1.5,
      numReviews: 5,
      description: 'high quality product',

    },
    {
      name: 'Puma Slim Shirt',
      category: 'Shirts',
      image: '/images/p4.jpg',
      price: 180,
      countInStock: 0,
      brand: 'Nike',
      rating: 5,
      numReviews: 20,
      description: 'high quality product',

    },
    {
      name: 'Zara Slim Shirt',
      category: 'Shirts',
      image: '/images/p5.jpg',
      price: 100,
      countInStock: 15,
      brand: 'Nike',
      rating: 2.5,
      numReviews: 13,
      description: 'high quality product',

    },

  ]
};

export default data;
