export const userStephanie = {
  name: process.env.SEED_GITHUB_NAME,
  email: process.env.SEED_GITHUB_EMAIL,
  emailVerified: null,
  image: process.env.SEED_GITHUB_AVATAR_URL,
  accounts: {
    create: {
      type: "oauth",
      provider: "github",
      providerAccountId: process.env.SEED_GITHUB_PROVIDER_ID,
      access_token: process.env.SEED_GITHUB_ACCESS_TOKEN,
      token_type: "bearer",
      scope: "read:user,user:email",
    },
  },
  listings: {
    create: {
      title: "Mansion abode",
      description: "Cool place to visit",
      imageSrc:
        "https://res.cloudinary.com/dzsoz9n3t/image/upload/v1684220287/tlpnuesycgn5htalhn9g.webp",
      category: "Beach",
      roomCount: 2,
      bathroomCount: 1,
      guestCount: 1,
      locationValue: "AO",
      price: 200,
      createdAt: new Date(),
    },
  },
};

export const userGuest = {
  name: "guest",
  email: "guest@email.com",
  hashedPassword:
    "$2b$12$r57Iv/UCurBIYXa7q9MKquuKErzg.rdorx/PG9FWIc/pIBxv.6.Da",
  image: "https://avatars.githubusercontent.com/u/20955624?v=5",
};
