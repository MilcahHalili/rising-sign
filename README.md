# Rising Sign Display Tool for Chani

<img src="https://i.imgur.com/IvwGObb.png" alt="chani-rising-sign-app-form-1" height="300px">

<img src="https://i.imgur.com/2NsqE1g.png" alt="chani-rising-sign-app-form-2" height="300px">

<img src="https://i.imgur.com/zqITvcs.png" alt="chani-leo-rising" height="300px">

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

Next.js has great built-in functionality such as image optimization and responsiveness. Compare Chani's Birth Chart app with this rising sign tool by changing the size of the window of the Birth Chart app on desktop. The logo's dimensions will warp while the rising sign tool's logo's dimensions persist due to Next's `<Image />` component. Next.js's built-in functionalities allowed me to build and deploy a MVP in a short, week-long sprint.

### Key decisions in using Next.js:
- SEO
- Image optimization
- Since the Birth Chart App already uses React, it made sense to build a SPA with a React framework. Chani's dev team can adopt Next.js easily.
- Serverless Next.js:
  - improved reliability
  - impoved scalability
  - splitting application into smaller parts (lambdas)
  - zero dependencies
- Deploying to Vercel:
  - zero configuration
  - Serverless Functions
  - instant deployment
  - intuitive GUI for build and lambda function logs

## Other Technical Considerations

Frontend is my first love, and I enjoy getting fonts and images pixel perfect and balancing whitespacing with elements on the page. That being said, styling took a hit to prioritize edge cases. I wanted to remove user error as much as possible, so effort I would have otherwise put into polishing the styling went into creating dynamic inputs. Here's the psuedocode I wrote to dynamically change the `max` attribute of the day `input` depending on what month it was and whether the birth year was a leap year:

```
if month is equal to jan, mar, may, jul, aug, oct, dec,
then max days equals 31

if month is equal to apr, jun, sep, nov,
then max days equals 30

formula to calculate leap year:

1. if year is evenly divisible by 4, go to step 2. otherwise, go to step 5
2. if year is evenly divisible by 100, go to step 3. otherwise, go to step 4
3. if year-divided-by-400's result is the last two digits of the year, go to step 4. otherwise, go to step 5
4. the year is a leap year (366-day year) max days equals 29
5. the year is not a leap year (365-day year) max days equals 28
```

Even though I didn't dedicate as much time to styling, it was important for me that this app was accessible and mobile friendly. As someone with poor eyesight whom has friends with different seeing abilities, I wanted to make sure the text was easy to read. Most of the people I know who aren't developers surf the web on their phones. Mobile-first is my instinct.

While dependencies decrease code reuse and can be a threat to long term stability of an application if the dependency is no longer maintained or removed, using axios and use-places-autocomplete allowed me to build faster. I chose these depencies because they've either withstood the test of time (axios), are consistently maintained, and are loved by many.

With the same logic that informed my decision to go with Next.js, I decided to use Vercel because Chani uses AWS Lambda, an event-driven serverless computing platform, and Amazon API Gateway for performing POST, GET, and UPDATE request methods. I wanted to follow a similar structure with this application.

Lastly, if Chani want to make their WordPress and Shopify sites more performant, they can decouple their "frontends" from their "backends" and use Next.js for the frontend. Next.js is a great use-case for static websites.

## Future Development (If I Had More Time, Then I Would Do This)

Given more time, I would have loved to incorporate passwordless authentication with [Magic](https://docs.magic.link/). Magic decreases the risk of losing customers due to forgotten passwords (linked to defunct email addresses), password data breaches (due to 57% of users re-using passwords), and abandoned shopping carts (due, again, to forgotten passwords.) Authentication and authorization would allow users to save their rising sign information instead of needing to fill out the form every time.

Error messages in real time would have also been great to implement, so that the user doesn't need to wait to click on the submit button to receive feedback.

Enabling authorization would build the foundation for features similar to the Chani iOS app. For example, users can review their weekly horoscopes on the website and add journal entries prompted by their rising sign horoscope for the week.

Another feature I'd have loved to add would be to add Ascendant Planetary Aspects, similar to Chani's Birth Chart app.

Lastly, a navigation to link the user to [ChaniNicholas.com](https://chaninicholas.com/), Chani's social media, and Shopify.

### Feedback from User Testing (How I Would Improve This App)
I asked my community of devs and nontechies to perform user testing on my app to catch bugs and provide feedback. The following is a list of the feedback I've received from users:

1. Highlight on the mouseover for birth place autocomplete dropdown.
2. Can't see the birth place autocomplete dropdown on desktop unless user scrolls down. Create a visual guide to let the user know they need to scroll down on desktop.
3. On mobile, if user enters one digit for birth year, the app bumps user to the top of the form, but an error doesn't render. Create custom error messages.

How I would improve this app:

1. Clean up my code. Make sure design patterns are consistent (using all style jsx instead of CSS modules, remove use of dependencies or switch to older dependencies with more consistent maintenance and community support, use restful routes, double check that components that could be reused are modular).
2. Polish the styling. Keep whitespacing balanced and consistent, especially on mobile. Keep font sizing balanced. Make sure images are sharp and optimized.
3. Review the Future Development section
4. Form width decreases due to the autocomplete birth place dropdown. Keep form width consisent. Remove excess `padding-left` from dropdown as well.
5. Change midday dropdown to AM and PM radio buttons to remove extra step for user.

Thanks for reading! 🖤 🤍

Go build amazing software that makes humans happy. ✌🏽