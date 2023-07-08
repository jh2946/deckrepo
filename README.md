# DeckRepo

DeckRepo is a flash card web application where users can submit flash cards.

This is currently a school project so for the time being it has a lot of security flaws. If I do develop this into a full-blown project and deploy I'll certainly patch them.

## Build instructions

In `./.env`:
```
DATABASE_URL= # database url here
EMAIL_ACC= # email address to send system emails
EMAIL_KEY= # password or application key to the email address
URL="127.0.0.1:5173" # domain name of the deployed site, currently sveltekit default
```

Then run in root folder:
```
npm install
npx prisma migrate --name init
npx prisma generate
npm run dev
```
