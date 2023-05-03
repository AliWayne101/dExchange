import { people01, people02, people03, facebook, instagram, linkedin, twitter, airbnb, binance, coinbase, dropbox, send, shield, star, aliwains  } from "../assets";

export const webConfigs = {
  name: "dExchange",
};

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "track",
    title: "Track",
  },
  {
    id: "exchange",
    title: "Exchange",
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "clients",
    title: "Clients",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Exchange Rates",
    content:
      "We offer one of the best exchange rates between two currencies with low transaction fee",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "We take proactive steps make sure your information and transactions are secure.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Transactions",
    content:
      "Each and every transaction is examined and processed by our team of experts, to maintain a secure flow of transactions to our users",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "I am amazed by your service, and the payment was right on time",
    name: "Rasib Ansari",
    title: "Customer",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Ali Wains",
    title: "Founder & Leader",
    img: aliwains,
  },
  {
    id: "feedback-3",
    content:
      "It is usually people in the money business, finance, and international trade that are really rich.",
    name: "Ali Wains",
    title: "Founder & Leader",
    img: aliwains,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "Satisfied Customers",
    value: "Refreshing",
  },
  {
    id: "stats-2",
    title: "Overall Transactions",
    value: "Refreshing",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "Refreshing",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Contact",
        link: "/contact/",
      },
      {
        name: "How it Works",
        link: "/how-it-works/",
      },
      {
        name: "Create",
        link: "/create/",
      },
      {
        name: "Explore",
        link: "/explore/",
      },
      {
        name: "Terms & Services",
        link: "/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "/help-center/",
      },
      {
        name: "Partners",
        link: "/partners/",
      },
      {
        name: "Suggestions",
        link: "/suggestions/",
      },
      {
        name: "Blog",
        link: "/blog/",
      },
      {
        name: "Newsletters",
        link: "/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "/become-a-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];

export const backendAddr = 'https://mainframe-backend.vercel.app';