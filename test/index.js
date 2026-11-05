const assert = require('node:assert');
const crypto = require('node:crypto');
const test = require('node:test');

const cache = require('memory-cache');

const WalmartMarketplace = require('../index');

test('WalmartMarketplace', { concurrency: true }, async (t) => {
    t.test('WalmartMarketplace.feeds', { concurrency: true }, async (t) => {
        t.test('WalmartMarketplace.feeds.getAllFeedStatuses(options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/json#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/json#'
                });

                const feedStatuses = await walmartMarketplace.feeds.getAllFeedStatuses({ limit: 1 });
                assert(feedStatuses);
            });

            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.feeds.getAllFeedStatuses();
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.feeds.getFeedItemStatus(feedId, options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/json#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/json#'
                });

                const feedItemStatus = await walmartMarketplace.feeds.getFeedItemStatus('12234EGGT564YTEGFA@AQMBAQA', { includeDetails: true });
                assert(feedItemStatus);
            });

            t.test('should throw error for non 200 status code', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                try {
                    await walmartMarketplace.feeds.getFeedItemStatus('12234EGGT564YTEGFA@AQMBAQA');
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 404);
                    assert.strictEqual(err.message, '404 Not Found');
                }
            });
        });
    });

    t.test('WalmartMarketplace.inventory', { concurrency: true }, async (t) => {
        t.test('WalmartMarketplace.inventory.getInventory(sku, options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const inventory = await walmartMarketplace.inventory.getInventory('97964_KFTest');
                assert(inventory);
                assert.strictEqual(inventory.sku, '97964_KFTest');
            });

            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.inventory.getInventory('97964_KFTest', { shipNode: '721407' });
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.inventory.updateInventory(inventory, options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/anything#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/anything#'
                });

                const inventory = {
                    sku: '97964_KFTest',
                    quantity: {
                        amount: 1,
                        unit: 'EACH'
                    }
                };

                const response = await walmartMarketplace.inventory.updateInventory(inventory);
                assert(response);
            });

            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                const inventory = {
                    sku: '97964_KFTest',
                    quantity: {
                        amount: 1,
                        unit: 'EACH'
                    }
                };

                try {
                    await walmartMarketplace.inventory.updateInventory(inventory, { shipNode: '721407' });
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });
    });

    t.test('WalmartMarketplace.items', { concurrency: true }, async (t) => {
        t.test('WalmartMarketplace.items.bulkItemSetup(feedType, file, options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/post#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/post#'
                });

                const mpItemMatch = {
                    MPItemFeedHeader: {
                        locale: 'en',
                        sellingChannel: 'mpsetupbymatch',
                        version: '4.2'
                    },
                    MPItem: [{
                        Item: {
                            condition: 'New',
                            price: 123,
                            productIdentifiers: {
                                productId: '123456789012',
                                productIdType: 'UPC'
                            },
                            ShippingWeight: 1,
                            sku: '123abc'
                        }
                    }]
                };

                const response = await walmartMarketplace.items.bulkItemSetup('MP_ITEM_MATCH', mpItemMatch);
                assert(response);
            });

            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                const mpItemMatch = {
                    MPItemFeedHeader: {
                        locale: 'en',
                        sellingChannel: 'mpsetupbymatch',
                        version: '4.2'
                    },
                    MPItem: [{
                        Item: {
                            condition: 'New',
                            price: 123,
                            productIdentifiers: {
                                productId: '123456789012',
                                productIdType: 'UPC'
                            },
                            ShippingWeight: 1,
                            sku: '123abc'
                        }
                    }]
                };

                try {
                    await walmartMarketplace.items.bulkItemSetup('MP_ITEM_MATCH', mpItemMatch, { 'WM_QOS.CORRELATION_ID': crypto.randomUUID() });
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.items.getAnItem(id, options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/json#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/json#'
                });

                const itemDetails = await walmartMarketplace.items.getAnItem('30348_KFTest', { condition: 'New' });
                assert(itemDetails);
            });

            t.test('should return an error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.items.getAnItem('30348_KFTest');
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.items.itemSearch(options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const searchResults = await walmartMarketplace.items.itemSearch({ upc: '911138034047' });
                assert(searchResults);
            });

            t.test('should return an error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.items.itemSearch({ upc: '911138034047' });
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.items.retireAnItem(sku, options)', { concurrency: true }, async (t) => {
            t.test('should retire an item', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const response = await walmartMarketplace.items.retireAnItem('123456');
                assert.strictEqual(response.errors, null);
                assert.strictEqual(response.sku, '123456');
            });

            t.test('should support options', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const response = await walmartMarketplace.items.retireAnItem('123456', { 'WM_QOS.CORRELATION_ID': crypto.randomUUID() });
                assert.strictEqual(response.errors, null);
                assert.strictEqual(response.sku, '123456');
            });

            t.test('should throw an error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.items.retireAnItem('123456');
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.items.catalogSearch(options)', { concurrency: true }, async (t) => {
            t.test('should return an array', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const items = await walmartMarketplace.items.catalogSearch({ query: { field: 'sku', value: '97964_KFTest' } });
                assert(Array.isArray(items));
            });

            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.items.catalogSearch({ query: { field: 'sku', value: '97964_KFTest' } });
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.items.getAllItems(options)', { concurrency: true }, async (t) => {
            t.test('should return an array', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const items = await walmartMarketplace.items.getAllItems({ limit: 1 });
                assert(Array.isArray(items));
            });

            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.items.getAllItems({ limit: 1 });
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.items.getAllItems(options) with autoPagination', { concurrency: true }, async (t) => {
            t.test('should return all items', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const items = await walmartMarketplace.items.getAllItems({ autoPagination: true, limit: 1 });
                assert(Array.isArray(items));
            });
        });
    });

    t.test('WalmartMarketplace.orders', { concurrency: true }, async (t) => {
        t.test('WalmartMarketplace.orders.acknowledgeOrder(purchaseOrderId, options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const response = await walmartMarketplace.orders.acknowledgeOrder('1796277083022');
                assert(response);
                assert.strictEqual(response.order[0].purchaseOrderId, '1796277083022');
            });

            t.test('should throw an error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.orders.acknowledgeOrder('1796277083022', { 'WM_QOS.CORRELATION_ID': crypto.randomUUID() });
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.orders.getAllOrders(options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/json#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/json#'
                });

                const orders = await walmartMarketplace.orders.getAllOrders();
                assert(orders);
            });

            t.test('should throw an error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.orders.getAllOrders({ sku: '97964_KFTest' });
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.orders.getAllOrders(options) with autoPagination', { concurrency: true }, async (t) => {
            t.test('should return all orders', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const orders = await walmartMarketplace.orders.getAllOrders({ autoPagination: true, limit: '1' });
                assert(Array.isArray(orders));
            });
        });

        t.test('WalmartMarketplace.orders.getAllReleasedOrders(options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const orders = await walmartMarketplace.orders.getAllReleasedOrders();
                assert(orders);
            });
        });

        t.test('WalmartMarketplace.orders.shipOrderLines(purchaseOrderId, orderShipment, options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const orderShipment = {
                    orderShipment: {
                        orderLines: {
                            orderLine: [
                                {
                                    intentToCancelOverride: false,
                                    lineNumber: '1',
                                    orderLineStatuses: {
                                        orderLineStatus: [
                                            {
                                                status: 'Shipped',
                                                statusQuantity: {
                                                    amount: '1',
                                                    unitOfMeasurement: 'EACH'
                                                },
                                                trackingInfo: {
                                                    carrierName: {
                                                        carrier: 'UPS'
                                                    },
                                                    methodCode: 'Standard',
                                                    shipDateTime: 1580821866000,
                                                    trackingNumber: '22344',
                                                    trackingURL: 'http://walmart/tracking/ups?&type=MP&seller_id=12345&promise_date=03/02/2020&dzip=92840&tracking_numbers=92345'
                                                },
                                                returnCenterAddress: {
                                                    address1: 'walmart store 2',
                                                    city: 'Huntsville',
                                                    country: 'USA',
                                                    dayPhone: '12344',
                                                    emailId: 'walmart@walmart.com',
                                                    postalCode: '35805',
                                                    name: 'walmart',
                                                    state: 'AL'
                                                }
                                            }
                                        ]
                                    },
                                    sellerOrderId: '92344'
                                },
                                {
                                    lineNumber: '2',
                                    orderLineStatuses: {
                                        orderLineStatus: [
                                            {
                                                status: 'Shipped',
                                                statusQuantity: {
                                                    amount: '1',
                                                    unitOfMeasurement: 'EACH'
                                                },
                                                trackingInfo: {
                                                    carrierName: {
                                                        carrier: 'FedEx'
                                                    },
                                                    methodCode: 'Express',
                                                    shipDateTime: 1580821866000,
                                                    trackingNumber: 22344,
                                                    trackingURL: 'http://walmart/tracking/fedEx?&type=MP&seller_id=12345&promise_date=03/02/2020&dzip=92840&tracking_numbers=92344'
                                                },
                                                returnCenterAddress: {
                                                    address1: 'walmart store 2',
                                                    city: 'Huntsville',
                                                    country: 'USA',
                                                    dayPhone: '12344',
                                                    emailId: 'walmart@walmart.com',
                                                    postalCode: '35805',
                                                    name: 'walmart',
                                                    state: 'AL'
                                                }
                                            }
                                        ]
                                    },
                                    sellerOrderId: '92344'
                                }
                            ]
                        }
                    }
                };

                const response = await walmartMarketplace.orders.shipOrderLines('1234567891234', orderShipment);
                assert(response);
                assert.strictEqual(response.order[0].purchaseOrderId, '1234567891234');
                assert(response.order[0].orderLines.orderLine.every(orderLine => orderLine.orderLineStatuses.orderLineStatus.every(orderLineStatus => orderLineStatus.status === 'Shipped')));
            });

            t.test('should throw an error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    const orderShipment = {
                        orderShipment: {
                            orderLines: {
                                orderLine: [
                                    {
                                        intentToCancelOverride: false,
                                        lineNumber: '1',
                                        orderLineStatuses: {
                                            orderLineStatus: [
                                                {
                                                    status: 'Shipped',
                                                    statusQuantity: {
                                                        amount: '1',
                                                        unitOfMeasurement: 'EACH'
                                                    },
                                                    trackingInfo: {
                                                        carrierName: {
                                                            carrier: 'UPS'
                                                        },
                                                        methodCode: 'Standard',
                                                        shipDateTime: 1580821866000,
                                                        trackingNumber: '22344',
                                                        trackingURL: 'http://walmart/tracking/ups?&type=MP&seller_id=12345&promise_date=03/02/2020&dzip=92840&tracking_numbers=92345'
                                                    },
                                                    returnCenterAddress: {
                                                        address1: 'walmart store 2',
                                                        city: 'Huntsville',
                                                        country: 'USA',
                                                        dayPhone: '12344',
                                                        emailId: 'walmart@walmart.com',
                                                        postalCode: '35805',
                                                        name: 'walmart',
                                                        state: 'AL'
                                                    }
                                                }
                                            ]
                                        },
                                        sellerOrderId: '92344'
                                    },
                                    {
                                        lineNumber: '2',
                                        orderLineStatuses: {
                                            orderLineStatus: [
                                                {
                                                    status: 'Shipped',
                                                    statusQuantity: {
                                                        amount: '1',
                                                        unitOfMeasurement: 'EACH'
                                                    },
                                                    trackingInfo: {
                                                        carrierName: {
                                                            carrier: 'FedEx'
                                                        },
                                                        methodCode: 'Express',
                                                        shipDateTime: 1580821866000,
                                                        trackingNumber: 22344,
                                                        trackingURL: 'http://walmart/tracking/fedEx?&type=MP&seller_id=12345&promise_date=03/02/2020&dzip=92840&tracking_numbers=92344'
                                                    },
                                                    returnCenterAddress: {
                                                        address1: 'walmart store 2',
                                                        city: 'Huntsville',
                                                        country: 'USA',
                                                        dayPhone: '12344',
                                                        emailId: 'walmart@walmart.com',
                                                        postalCode: '35805',
                                                        name: 'walmart',
                                                        state: 'AL'
                                                    }
                                                }
                                            ]
                                        },
                                        sellerOrderId: '92344'
                                    }
                                ]
                            }
                        }
                    };

                    await walmartMarketplace.orders.shipOrderLines('1234567891234', orderShipment, { 'WM_QOS.CORRELATION_ID': crypto.randomUUID() });
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });
    });

    t.test('WalmartMarketplace.prices', { concurrency: true }, async (t) => {
        t.test('WalmartMarketplace.prices.updatePrice(price, options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const price = {
                    pricing: [
                        {
                            currentPrice: {
                                amount: 12.34,
                                currency: 'USD'
                            },
                            currentPriceType: 'BASE'
                        }
                    ],
                    sku: '97964_KFTest'
                };

                const response = await walmartMarketplace.prices.updatePrice(price);
                assert(response);
                assert.strictEqual(response.ItemPriceResponse.sku, '97964_KFTest');
            });

            t.test('should throw an error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    const price = {
                        pricing: [
                            {
                                currentPrice: {
                                    amount: 12.34,
                                    currency: 'USD'
                                },
                                currentPriceType: 'BASE'
                            }
                        ],
                        sku: '97964_KFTest'
                    };

                    await walmartMarketplace.prices.updatePrice(price, { 'WM_QOS.CORRELATION_ID': crypto.randomUUID() });
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });
    });

    t.test('WalmartMarketplace.reports', async (t) => {
        t.test('WalmartMarketplace.reports.createReportRequest(reportType, reportVersion, requestBody, options)', { concurrency: true }, async (t) => {
            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.reports.createReportRequest('ITEM', 'v1');
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.reports.downloadReportUrl(requestId, options)', { concurrency: true }, async (t) => {
            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.reports.downloadReportUrl('test-request-id');
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.reports.getAllReportRequests(reportType, options)', { concurrency: true }, async (t) => {
            t.test('should return an array', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const reportRequests = await walmartMarketplace.reports.getAllReportRequests('ITEM');
                assert(Array.isArray(reportRequests));
            });

            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.reports.getAllReportRequests('ITEM');
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.reports.getAvailableReconciliationReportDates(options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const response = await walmartMarketplace.reports.getAvailableReconciliationReportDates();
                assert(response);
            });

            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.reports.getAvailableReconciliationReportDates();
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.reports.reportRequestStatus(requestId, options)', { concurrency: true }, async (t) => {
            t.test('should return json', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const reportRequests = await walmartMarketplace.reports.getAllReportRequests('ITEM');
                assert(reportRequests.length > 0);

                const response = await walmartMarketplace.reports.reportRequestStatus(reportRequests[0].requestId);
                assert(response);
                assert(response.requestId);
            });

            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.reports.reportRequestStatus('test-request-id');
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });

        t.test('WalmartMarketplace.reports.getReconciliationReport(reportDate, options)', { concurrency: true }, async (t) => {
            t.test('should return an array', async () => {
                const walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                const dates = await walmartMarketplace.reports.getAvailableReconciliationReportDates();

                if (Array.isArray(dates?.availableApReportDates) && dates.availableApReportDates.length > 0) {
                    const reportData = await walmartMarketplace.reports.getReconciliationReport(dates.availableApReportDates[0]);
                    assert(Array.isArray(reportData));
                }
            });

            t.test('should throw error for non 200 status code', async () => {
                let walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET
                });

                // HACK: The following code adds an access token to the cache for a different environment
                cache.clear();
                const accessToken = await walmartMarketplace.authentication.getAccessToken();
                const json = JSON.parse(cache.keys()[0]);
                json.url = 'https://httpbingo.org/status/500#';
                cache.put(JSON.stringify(json), accessToken);

                walmartMarketplace = new WalmartMarketplace({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    url: 'https://httpbingo.org/status/500#'
                });

                try {
                    await walmartMarketplace.reports.getReconciliationReport('2026-01-01');
                    assert.fail('Expected an error to be thrown');
                } catch (err) {
                    assert(err);
                    assert.strictEqual(err.cause.status, 500);
                    assert.strictEqual(err.message, '500 Internal Server Error');
                }
            });
        });
    });
});

test('WalmartMarketplace.authentication', { concurrency: true }, async (t) => {
    t.test('WalmartMarketplace.authentication.getAccessToken(options)', { concurrency: true }, async (t) => {
        t.beforeEach(() => {
            cache.clear();
        });

        t.test('should support options', async () => {
            const walmartMarketplace = new WalmartMarketplace({
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET
            });

            const accessToken = await walmartMarketplace.authentication.getAccessToken({ 'WM_QOS.CORRELATION_ID': crypto.randomUUID() });
            assert(accessToken);
        });

        t.test('should cache the access token', async () => {
            const walmartMarketplace = new WalmartMarketplace({
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET
            });

            assert.strictEqual(cache.size(), 0);

            const accessToken1 = await walmartMarketplace.authentication.getAccessToken();
            assert.strictEqual(cache.size(), 1);

            const accessToken2 = await walmartMarketplace.authentication.getAccessToken();
            assert.strictEqual(cache.size(), 1);

            assert.deepStrictEqual(accessToken1, accessToken2);
        });

        t.test('should return an error for invalid url', async () => {
            const walmartMarketplace = new WalmartMarketplace({
                url: 'invalid'
            });

            try {
                await walmartMarketplace.authentication.getAccessToken();
                assert.fail('Expected an error to be thrown');
            } catch (err) {
                assert(err);
                assert.strictEqual(err.message, 'Failed to parse URL from invalid/v3/token');
            }
        });

        t.test('should return an error for non 200 status code', async () => {
            const walmartMarketplace = new WalmartMarketplace({
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                url: 'https://httpbingo.org/status/500#'
            });

            try {
                await walmartMarketplace.authentication.getAccessToken();
                assert.fail('Expected an error to be thrown');
            } catch (err) {
                assert(err);
                assert.strictEqual(err.cause.status, 500);
                assert.strictEqual(err.message, '500 Internal Server Error');
            }
        });
    });
});