# Rising Sign Display Tool for Chani

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Tech Stack

- [Next.js](https://nextjs.org/docs) — React Framework
- [Vercel](https://vercel.com/docs) — Cloud PAAS for static sites and Serverless Functions
- [Google Places API](https://developers.google.com/places/web-service/overview) — API for fetching latitude and longitude birth place coordinates
- [AstrologyAPI](https://www.astrologyapi.com/docs/) — API for fetching custom Chani data

### Dependencies

- [axios](https://www.npmjs.com/package/axios)
- [use-places-autocomplete](https://www.npmjs.com/package/use-places-autocomplete)

## Why This Tech Stack

[Chani's Birth Chart app](https://chart.chaninicholas.com/) is built with React, which is the leading library for single-page applications (or SPAs). While there are many benefits to React, a major con is that you lose SEO since JavaScript injects all content client-side, or in the broswer, into a `div` with an `id` of `root`. Next.js solves this issue while maintaining a great React-esque developer experience.

Next.js has great built-in functionality such as image optimization and responsiveness. Compare Chani's Birth Chart app with this rising sign tool by changing the size of the window of the Birth Cart app on desktop. The logo's dimensions will warp while the rising sign tool's logo's dimensions persist due to Next's `<Image />` component. Next.js's built-in functionalities allowed me to build and deploy a MVP in a short, week-long sprint.

### Key decision in using Next.js as a list:
- SEO
- Image optimization
- Since the Birth Chart App already uses React, it made sense to build a SPA with a React framework. Chani's dev team can adopt Next.js easily.
- Serverless Next.js, which means:
  - improved reliability
  - impoved scalability
  - splitting application into smaller parts (lambdas)
  - zero dependencies
- Deploying to Vercel, which means:
  - zero configuration
  - Serverless Functions
  - instant deployment
  - intuitive GUI for build and function logs

## Other Technical Considerations

While dependencies decrease code reuse and can be a threat to long term stability of an application if the dependency is no longer maintained or removed, using axios and use-places-autocomplete allowed me to build faster. I chose these depencies because they've either withstood the test of time (axios), are consistently maintained, and are loved by many.

With the same logic that informed my decision to go with Next.js, I decided to use Vercel because Chani uses AWS Lambda, an event-driven serverless computing platform, and Amazon API Gateway for performing POST, GET, and UPDATE request methods. I wanted to follow a similar structure with this application.

Lastly, if Chani wanted to make their WordPress and Shopify sites more performant, they can decouple their "frontends" from their "backends" and use Next.js for the frontend. Next.js is a great use-case for static websites.

## Future Development (If I Had More Time, Then I Would Do This)

Given more time, I would have loved to incorporate passwordless authentication with [Magic](https://docs.magic.link/). Magic decreases the risk of losing customers due to forgotten passwords (linked to defunct email addresses), password data breaches (due to 57% of users re-using passwords), and abandoned shopping carts (due, again, to forgotten passwords.) Authentication and authorization would allow users to save their rising sign information instead of needing to fill out the form every time.

Enabling authorization would build the foundation for features similar to the Chani iOS app. For example, users can review their weekly horoscopes on the website and add journal entries prompted by their rising sign horoscope for the week.

Another feature I'd have loved to add would be to add Ascendant Planetary Aspects, similar to Chani's Birth Chart app.

Lastly, a navigation to link the user to [ChaniNicholas.com](https://chaninicholas.com/), Chani's social media, and Shopify.

### Feedback from User Testing (How I Would Improve This App)