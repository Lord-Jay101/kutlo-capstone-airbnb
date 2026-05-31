const mongoose = require("mongoose");
const Accommodation = require("../Backends/models/accommodation");

const MONGO_URI = "mongodb://127.0.0.1:27017/airbnb_clone";

const seedData = [

  {
    title: "Apartment in New York",
    description: "Modern living meets historic character inside a 1931 Art Deco landmark in Lower Manhattan: thoughtfully designed apartments ranging from efficient studios to spacious three-bedroom layouts, all with fully equipped kitchens and contemporary finishes. Enjoy a range of shared amenities, including a rooftop with views of the city and Brooklyn Bridge, coworking and meeting spaces, a game room, and a 24-hour fitness center--all a short walk from Battery Park and Financial District hubs.",
    location: "New York",
    type: "Apartment",
    price: 190,
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/6a1360c4-5003-4e87-a793-c69d0520444c.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/44c81606-e7b1-4b11-8e5f-fce6f099162c.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/00c314dc-d14e-4624-b4eb-ea7cb2527774.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/d1e1e10d-71c2-4d95-9f78-bef4b39cb0f7.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/5a33c0ae-dad6-4975-8c1a-7f9adf49a3e9.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/8395136f-1959-4f91-8b9c-4112d0f186c1.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/059f4120-fb56-4ba6-a9f1-85c31fd77637.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/f85a5dff-4cb1-4f7f-8aba-20177211ab78.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/34a401aa-5d26-4421-8a95-e3990ec97391.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/f1252f10-8ec5-41f5-815e-9e20f09d3dd1.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/8945e72b-0076-40b4-b49f-26ea90367a99.jpeg?im_w=720",
    ],
    bedroomImage:
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1653811014342621466/original/00c314dc-d14e-4624-b4eb-ea7cb2527774.jpeg?im_w=1200",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Air conditioning", "WiFi", "Pets Allowed","Elevator","Luggage dropoff allowed","kitchen","Dishwasher","Hot water kettle","Coffee maker","Outdoor furniture","Sun loungers"],
    rating: 4.86,
    reviews: 42,
    host_id: new mongoose.Types.ObjectId(),
    weeklyDiscount: 15,
    cleaningFee: 20,
    serviceFee: 18,
    occupancyTaxes: 8,
    enhancedCleaning: true,
    selfCheckIn: false,
    specificRatings: {
      cleanliness: 5,
      communication: 4.9,
      checkIn: 4.8,
      accuracy: 4.9,
      location: 5,
      value: 4.7,
    },
  },

   {
    title: "Stylish condo in Paris",
    description: "Choose a cozy, modern and ideally located apartment. <br> In a quiet and pleasant area, close to all essential amenities and a few steps from metro line 8 Pointe du Lac allowing you quick and easy access to the capital",
    location: "Paris",
    type: "Condo",
    price: 220,
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/4bc29ee6-7b71-40df-8aed-f9e6d357bc1a.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/0faae104-0544-4d50-aa71-a437d9e6b5f6.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/01205757-0e71-4754-9d17-d7f6630cb373.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/398bb2e2-1c1a-40f6-99f3-985529e57814.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/6a13ee4d-cd11-41f4-a920-b5224048813a.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/2bfdcb8e-9b38-418c-993d-d48d3ba601de.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/934b1f21-97b8-4f05-b510-687bba3a7cc5.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/14177b6c-8a8a-498d-9136-5b759770d224.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/5457e9bb-eb5b-446e-bbed-e183574dbce8.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/674c3b4e-36b2-46db-aa09-efbd96efedbf.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/2e32b4c5-7200-4053-b856-300c1970e0e6.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/ceb6e26b-3ee9-44e8-a792-1ea282bc92c3.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/b83ed31c-d033-46c8-abb1-bed92660027e.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/cd8bc42e-0e38-46c0-a471-f6dd53859cb3.jpeg?im_w=720",

    ],
    bedroomImage:
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1144377538490077322/original/01205757-0e71-4754-9d17-d7f6630cb373.jpeg?im_w=720",
    guests: 4,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Patio or Balcony", "Dedicated workspace", "Wifi","Bed linens","Room-darkening shades","Sound system","Smart lock",],
    rating: 5,
    reviews: 89,
    host_id: new mongoose.Types.ObjectId(),
    weeklyDiscount: 15,
    cleaningFee: 25,
    serviceFee: 19,
    occupancyTaxes: 8,
    enhancedCleaning: true,
    selfCheckIn: false,
    specificRatings: {
      cleanliness: 5,
      communication: 5,
      checkIn: 4.6,
      accuracy: 4.1,
      location: 5,
      value: 4.5,
    },
  },

  {
    title: "Guesthouse in Chiyoda-ku, Japan",
    description: "Our spacious and cozy home is perfect for families with children. Located on the 2nd floor with gentle stairs and handrails, it offers a warm, homelike atmosphere where you can relax and sleep peacefully. We also provide two women’s yukata (Japanese robes) free of charge for a memorable cultural experience.",
    location: "Tokyo",
    type: "Guesthouse",
    price: 115,
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3OTQ0NDE3OTMzNjcxMTExMA==/original/49438bca-9db7-478e-8eab-d5b54ab41170.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1379444179336711110/original/584e167e-cd0d-4fe7-981d-dc55255633b7.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1379444179336711110/original/89f3ba5c-8b93-4fdc-a266-c05f0df7d914.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3OTQ0NDE3OTMzNjcxMTExMA==/original/211c8e4e-d32c-4e1b-bdc3-42e669e66093.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3OTQ0NDE3OTMzNjcxMTExMA==/original/bb488b23-0932-4eb1-9ece-2978297ae59f.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1379444179336711110/original/b19263f2-2612-4a4a-84e9-e7a71124293b.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3OTQ0NDE3OTMzNjcxMTExMA==/original/4bab13a6-551b-409a-820d-46a73baecc95.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3OTQ0NDE3OTMzNjcxMTExMA==/original/0871152e-57ed-48aa-8282-8f529caaea1e.jpeg?im_w=720",

    ],
    bedroomImage:
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1379444179336711110/original/89f3ba5c-8b93-4fdc-a266-c05f0df7d914.jpeg?im_w=720",
    guests: 7,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["Bathtub", "Free washer - in unit", "Wifi","Hot tub","Dryer","Air conditioning","Exterior or entryway security camera present"],
    rating: 4.1,
    reviews: 25,
    host_id: new mongoose.Types.ObjectId(),
    weeklyDiscount: 10,
    cleaningFee: 25,
    serviceFee: 19,
    occupancyTaxes: 8,
    enhancedCleaning: true,
    selfCheckIn: false,
    specificRatings: {
      cleanliness: 5,
      communication: 5,
      checkIn: 4.8,
      accuracy: 4.6,
      location: 5,
      value: 4.9,
    },
  },

  {
    title: "Home in Ko Pha-ngan District, Thailand",
    description: "A beautifully designed private villa just a short walk from the beach. Enjoy your own private pool, sauna and ice bath, daily cleaning service, and a peaceful tropical setting surrounded by nature. Designed for guests who value privacy, comfort and well-being, this villa offers the perfect balance between relaxation and refined living, ideal for unwinding, recharging and truly disconnecting.",
    location: "Thailand",
    type: "Villa",
    price: 370,
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1613710285421646999/original/9bc74c09-a36f-455b-adee-1d8674d4943f.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1613710285421646999/original/ac8be704-6593-4fca-8d0f-5ff72ca1732f.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1613710285421646999/original/6128035e-7c4e-4735-b13a-b6a8b28c3cd1.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1613710285421646999/original/c6ac923f-d18d-42d1-907b-3461850fcc30.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1613710285421646999/original/3b695105-4ad9-4006-920b-a584deebf167.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1613710285421646999/original/bdd85156-3d24-4ffa-86e2-68789638b208.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1613710285421646999/original/bedeede3-b3b7-4cc7-a26f-5e61af369a7f.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1613710285421646999/original/194aff80-d9c6-4f80-84c3-9a11e325f793.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1613710285421646999/original/e2c75dfc-3951-4a46-bfd9-d2b788a053fd.jpeg?im_w=720"
    ],
    bedroomImage:
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1613710285421646999/original/ac8be704-6593-4fca-8d0f-5ff72ca1732f.jpeg?im_w=720",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Pool", "Beach access", "Free parking on premises","Wifi","TV","Air Conditioning","Outdoor Shower"],
    rating: 4.7,
    reviews: 67,
    host_id: new mongoose.Types.ObjectId(),
    weeklyDiscount: 10,
    cleaningFee: 25,
    serviceFee: 19,
    occupancyTaxes: 8,
    enhancedCleaning: true,
    selfCheckIn: false,
    specificRatings: {
      cleanliness: 4,
      communication: 4.4,
      checkIn: 4.1,
      accuracy: 4.2,
      location: 3.9,
      value: 4.9,
    },
  },

  {
    title: "Loft Apartment with Table Mountain Views",
    description: "Open the double doors to the balcony from the expansive lounge and admire the mountain panorama. This spectacular double volume loft apartment features a mezzanine bedroom overlooking the living area and is close to trendy restaurants and bars. The pool also boasts a lovely café for delicious coffee & light meals.",
    location: "Cape Town",
    type: "Loft",
    price: 135,
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTg0MTgwNDg%3D/original/da3db84f-0232-40b8-a8be-e07daff6a109.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTg0MTgwNDg%3D/original/da6524dc-9bf7-4d8e-a650-361a7ffdd340.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTg0MTgwNDg%3D/original/fb2f9f94-e596-4762-abe9-11729cf99b83.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTg0MTgwNDg%3D/original/fc35dbf3-3e57-4daf-bf17-fc6fb63bf69f.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTg0MTgwNDg%3D/original/a4f25608-e543-4fb9-b939-5057eb071aa0.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTg0MTgwNDg%3D/original/86a4cbcc-3fab-4cb2-844c-3f2f971e6f8f.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-18418048/original/e2a582ba-670f-4a4c-ac19-e38803a6a838.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTg0MTgwNDg%3D/original/7c441231-7364-4d95-8a87-51b0fb382f41.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTg0MTgwNDg%3D/original/71a89f9a-76ce-43ac-bac3-bed0b60036e2.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTg0MTgwNDg%3D/original/9f09fe08-4903-4bc4-bddf-29588206810f.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTg0MTgwNDg%3D/original/ed90e73f-b6e5-40d6-a6df-e5c7925c2e44.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-18418048/original/a92e24bd-6d7f-4a40-87ec-f5e10da4f14c.jpeg?im_w=1200",
    ],
    bedroomImage:
      "https://a0.muscache.com/im/pictures/miso/Hosting-18418048/original/e2a582ba-670f-4a4c-ac19-e38803a6a838.jpeg?im_w=1200",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Pool", "Wifi", "TV", "Dryer","Air conditioning","Heating","Smoke alarm","Fire exstinguisher","Kitchen","Microwave","Dish washer","Stove","Wine glasses","Trash compactor","Private patio","Sun loungers","Self check-in","Lockbox",],
    rating: 4.9,
    reviews: 119,
    host_id: new mongoose.Types.ObjectId(),
    weeklyDiscount: 10,
    cleaningFee: 25,
    serviceFee: 19,
    occupancyTaxes: 8,
    enhancedCleaning: true,
    selfCheckIn: false,
    specificRatings: {
      cleanliness: 5,
      communication: 4.5,
      checkIn: 4.9,
      accuracy: 4.8,
      location: 4.9,
      value: 5,
    },
  },
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Accommodation.deleteMany({});
    console.log("Old listings removed");

    await Accommodation.insertMany(seedData);
    console.log("Database seeded successfully");

    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedDB();