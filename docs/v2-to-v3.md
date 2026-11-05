# Migrating from v2 to v3

v3 removes callback support. Every method returns a promise, and the final callback parameter is gone from every signature.

## Method callbacks → promises

**Before**

```javascript
walmartMarketplace.items.getAnItem('97964_KFTest', function(err, itemDetails) {
    if (err) {
        // Handle error
    }

    console.log(itemDetails);
});
```

**After**

```javascript
const itemDetails = await walmartMarketplace.items.getAnItem('97964_KFTest');
```

Error handling moves from the err-first parameter to `try`/`catch` (or `.catch`):

```javascript
try {
    await walmartMarketplace.inventory.updateInventory({ quantity: { amount: 10, unit: 'EACH' }, sku: '97964_KFTest' });
} catch (err) {
    // Handle error (err.cause is the fetch Response)
}
```

## Leftover callbacks

On v3, a callback passed where `options` (or `requestBody`) goes is treated as that argument and never called: the result or error goes only to the returned promise.

## Fire-and-forget calls

Calls that passed a callback only to ignore the result or error now need to handle the returned promise. An ignored rejected promise crashes modern Node.js processes:

**Before**

```javascript
walmartMarketplace.items.retireAnItem(sku, () => {});
```

**After**

```javascript
walmartMarketplace.items.retireAnItem(sku).catch(() => {});
```

## Optional arguments

`options` (and `requestBody` for `reports.createReportRequest`) default to `{}` only when omitted. Passing `null` throws a `TypeError`; leave the argument out instead.
