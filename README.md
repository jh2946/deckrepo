# DeckRepo

DeckRepo is a web application where users can submit, publish, and review flash cards. ~~yes it's a login + CRUD app i'm weak ;-;~~

This is currently a school project so for the time being it has a lot of security flaws. If I do develop this into a full-blown project and deploy I'll certainly patch them.

Also I'll not be reading or accepting pull requests until 1 August 2023 as this is an individual assignment, but issues that describe any problems would be nice.

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
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```
