# Firebase Project Setup and Deployment Guide

## Prerequisites

- Node.js installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase account

## Project Structure

```
firebase/
├── functions/
│   └── index.ts
├── public/
└── firebase.json
```

## Setup

1. Login to Firebase:

```bash
firebase login
```

## Functions

1. Navigate to functions directory:

```bash
cd functions
```

2. Install dependencies:

```bash
npm install
```

3. Write your functions in `index.ts`:

```typescript
import * as functions from "firebase-functions";

export const myFunction = functions.https.onCall((data, context) => {
  // Function logic here
});
```

## Deployment

1. Deploy everything:

```bash
firebase deploy
```

2. Deploy only functions:

```bash
firebase deploy --only functions
```

3. Deploy specific function:

```bash
firebase deploy --only functions:myFunction
```

## Testing

- Test functions locally:

```bash
firebase emulators:start
```

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Cloud Functions Documentation](https://firebase.google.com/docs/functions)
