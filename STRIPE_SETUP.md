# Stripe Integration Setup Guide

This guide will help you set up Stripe for the Tactus shop.

## Step 1: Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com) and sign up for an account
2. Complete the account setup process

## Step 2: Get Your API Keys

1. Go to the Stripe Dashboard: [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Click on "Developers" in the left sidebar
3. Click on "API keys"
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Click "Reveal test key token" and copy your **Secret key** (starts with `sk_test_`)

## Step 3: Create Your Products

### Create the Jacket Product:

1. Go to [https://dashboard.stripe.com/products](https://dashboard.stripe.com/products)
2. Click "Add product"
3. Fill in the details:
   - **Name**: TACTUS CODEC JACKET
   - **Description**: Premium codec jacket with haptic feedback technology
   - **Price**: $459.00 USD (or 45900 cents)
   - **Recurring**: Leave unchecked (one-time payment)
4. Click "Save product"
5. Copy the **Price ID** (starts with `price_`) - you'll need this

### Create the Vest Product:

1. Click "Add product" again
2. Fill in the details:
   - **Name**: TACTUS CODEC VEST
   - **Description**: Premium codec vest with haptic feedback technology
   - **Price**: $459.00 USD (or 45900 cents)
   - **Recurring**: Leave unchecked (one-time payment)
3. Click "Save product"
4. Copy the **Price ID** (starts with `price_`) - you'll need this

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (copy from `.env.example`)
2. Add your Stripe keys:

```env
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
NEXT_PUBLIC_STRIPE_PRICE_JACKET=price_YOUR_JACKET_PRICE_ID
NEXT_PUBLIC_STRIPE_PRICE_VEST=price_YOUR_VEST_PRICE_ID
```

## Step 5: Test Your Integration

1. Start your development server: `npm run dev`
2. Navigate to the shop page: `http://localhost:3000/shop`
3. Click "Add to Cart" on a product
4. Open the cart dropdown in the navbar
5. Click "Checkout"
6. You should be redirected to Stripe Checkout

### Test Card Numbers:

- **Success**: 4242 4242 4242 4242
- **Requires authentication**: 4000 0025 0000 3155
- **Declined**: 4000 0000 0000 9995

Use any future expiration date and any 3-digit CVC.

## Step 6: Configure Shipping (Optional)

In the API route (`src/app/api/create-checkout-session/route.ts`), you can customize the shipping countries:

```typescript
shipping_address_collection: {
  allowed_countries: ["US", "CA", "GB", "AU"], // Add more countries as needed
}
```

## Step 7: Go Live (When Ready)

1. Complete your Stripe account activation
2. Switch to live mode in the Stripe Dashboard
3. Get your **live** API keys (starting with `pk_live_` and `sk_live_`)
4. Update your production environment variables
5. Create live products with live Price IDs
6. Deploy your application

## Troubleshooting

### "No such price" error:

- Make sure you've created the products in Stripe
- Verify the Price IDs in your `.env.local` are correct
- Ensure you're using the correct mode (test vs live)

### Checkout not redirecting:

- Check your browser console for errors
- Verify your API keys are set correctly
- Make sure the API route is accessible

### Cart not persisting:

- Clear your browser's localStorage
- Check browser console for errors
- Make sure you're not in incognito/private mode

## Additional Resources

- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe API Reference](https://stripe.com/docs/api)
