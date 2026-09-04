import schemaData from "./schema.json";

const structuredData = JSON.stringify(schemaData, null, 2);

export const seoHeadHtml = `
<title>KiwiHacks - New Zealand's High School Hackathon Club</title>
<link rel="canonical" href="https://kiwihacks.org/">
<meta name="description" content="KiwiHacks is New Zealand's high school hackathon club - free events for teenage coders and innovators, run by high schoolers, for high schoolers. KiwiHacks Nova is coming to Auckland, Wellington, and Christchurch.">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:title" content="KiwiHacks - New Zealand's High School Hackathon Club">
<meta property="og:description" content="KiwiHacks is New Zealand's high school hackathon club - free events for teenage coders and innovators, run by high schoolers, for high schoolers. KiwiHacks Nova is coming to Auckland, Wellington, and Christchurch.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://kiwihacks.org/">
<meta property="og:site_name" content="KiwiHacks">
<meta property="og:locale" content="en_NZ">
<meta property="og:image" content="https://kiwihacks.org/kiwihacksimage.png">
<meta property="og:image:alt" content="KiwiHacks logo">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="KiwiHacks - New Zealand's High School Hackathon Club">
<meta name="twitter:description" content="KiwiHacks is New Zealand's high school hackathon club - free events for teenage coders and innovators, run by high schoolers, for high schoolers. KiwiHacks Nova is coming to Auckland, Wellington, and Christchurch.">
<meta name="twitter:image" content="https://kiwihacks.org/kiwihacksimage.png">
<meta name="twitter:image:alt" content="KiwiHacks logo">
<meta name="google-site-verification" content="VqkpY5ewNGoc7i8GhhyaS7zRb9i1O44_6uHjQsr1Vpw">
<script type="application/ld+json">${structuredData}</script>
`;
