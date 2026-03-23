// Cache for API responses
let apiCache = new Map();
let lastRequestTime = 0;
let requestQueue = [];
let isProcessingQueue = false;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds retry delay

// Process request queue with rate limiting
async function processQueue() {
    if (isProcessingQueue || requestQueue.length === 0) return;
    
    isProcessingQueue = true;
    
    while (requestQueue.length > 0) {
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        
        if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
            await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
        }
        
        const { request, resolve, reject, retryCount = 0 } = requestQueue.shift();
        
        lastRequestTime = Date.now();
        
        try {
            const response = await fetch(request.url, request.options);
            
            if (response.status === 429) {
                if (retryCount < MAX_RETRIES) {
                    console.log(`Rate limited, retrying ${retryCount + 1}/${MAX_RETRIES}...`);
                    // Add back to queue with increased retry count
                    requestQueue.unshift({ request, resolve, reject, retryCount: retryCount + 1 });
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                    continue;
                } else {
                    reject(new Error('Rate limit exceeded. Please try again later.'));
                }
            } else if (!response.ok) {
                reject(new Error(`HTTP ${response.status}`));
            } else {
                const data = await response.json();
                resolve(data);
            }
        } catch (error) {
            if (retryCount < MAX_RETRIES) {
                console.log(`Request failed, retrying ${retryCount + 1}/${MAX_RETRIES}...`);
                requestQueue.unshift({ request, resolve, reject, retryCount: retryCount + 1 });
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                continue;
            } else {
                reject(error);
            }
        }
    }
    
    isProcessingQueue = false;
}

// Make API request with queue and rate limiting
function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        requestQueue.push({
            request: { url, options },
            resolve,
            reject,
            retryCount: 0
        });
        processQueue();
    });
}

chrome.runtime.onInstalled.addListener(() => {
    console.log('CryptoLens Pro installed');
    
    // Initialize storage
    chrome.storage.local.get(['currency', 'darkMode', 'priceAlerts'], (result) => {
        if (!result.currency) {
            chrome.storage.local.set({ currency: 'usd' });
        }
        if (result.darkMode === undefined) {
            chrome.storage.local.set({ darkMode: false });
        }
        if (!result.priceAlerts) {
            chrome.storage.local.set({ priceAlerts: [] });
        }
    });
    
    // Create alarm for checking alerts every minute
    chrome.alarms.create('checkAlerts', { periodInMinutes: 1 });
});

// Check price alerts
async function checkPriceAlerts() {
    try {
        const result = await chrome.storage.local.get(['priceAlerts', 'currency']);
        const alerts = result.priceAlerts || [];
        const currency = result.currency || 'usd';
        
        if (alerts.length === 0) return;
        
        // Group alerts by coin to minimize API calls
        const alertsByCoin = {};
        alerts.forEach(alert => {
            if (!alert.triggered) {
                if (!alertsByCoin[alert.coinId]) {
                    alertsByCoin[alert.coinId] = [];
                }
                alertsByCoin[alert.coinId].push(alert);
            }
        });
        
        // Fetch current prices for coins with active alerts
        for (const [coinId, coinAlerts] of Object.entries(alertsByCoin)) {
            try {
                const cacheKey = `price_${coinId}_${currency}`;
                let priceData = apiCache.get(cacheKey);
                
                // Check if we have recent cached data
                if (!priceData || (Date.now() - priceData.timestamp) > 60000) {
                    // Fetch fresh price
                    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currency}`;
                    const data = await makeRequest(url);
                    
                    priceData = {
                        data: data,
                        timestamp: Date.now()
                    };
                    apiCache.set(cacheKey, priceData);
                }
                
                const currentPrice = priceData.data[coinId]?.[currency];
                
                if (currentPrice) {
                    let alertsTriggered = false;
                    
                    coinAlerts.forEach(alert => {
                        let shouldTrigger = false;
                        
                        if (alert.condition === 'above' && currentPrice >= alert.targetPrice) {
                            shouldTrigger = true;
                        } else if (alert.condition === 'below' && currentPrice <= alert.targetPrice) {
                            shouldTrigger = true;
                        }
                        
                        if (shouldTrigger && !alert.triggered) {
                            alert.triggered = true;
                            alertsTriggered = true;
                            
                            // Show notification
                            chrome.notifications.create({
                                type: 'basic',
                                iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234CAF50"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9v4c0 .83-.67 1.5-1.5 1.5S2 13.83 2 13V9c0-5.52 4.48-10 10-10s10 4.48 10 10v4c0 .83-.67 1.5-1.5 1.5S19 13.83 19 13V9c0-3.87-3.13-7-7-7z"/%3E%3C/svg%3E',
                                title: `🚨 Price Alert: ${alert.coinName.toUpperCase()}`,
                                message: `${alert.coinName.toUpperCase()} is ${alert.condition} ${formatPrice(alert.targetPrice, alert.currency)}! Current: ${formatPrice(currentPrice, alert.currency)}`,
                                priority: 2
                            });
                        }
                    });
                    
                    // Save triggered alerts
                    if (alertsTriggered) {
                        await chrome.storage.local.set({ priceAlerts: alerts });
                    }
                }
            } catch (error) {
                console.error(`Error checking alerts for ${coinId}:`, error);
            }
        }
    } catch (error) {
        console.error('Error checking alerts:', error);
    }
}

function formatPrice(price, currency) {
    const symbols = { usd: '$', eur: '€', inr: '₹' };
    const symbol = symbols[currency] || '$';
    
    if (price < 0.01) return `${symbol}${price.toFixed(6)}`;
    if (price < 1) return `${symbol}${price.toFixed(4)}`;
    if (price < 1000) return `${symbol}${price.toFixed(2)}`;
    return `${symbol}${price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// Message handling
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchPrice") {
        const currency = request.currency || 'usd';
        const coinId = request.coinId;
        
        if (!coinId) {
            sendResponse({ success: false, error: 'No coin ID provided' });
            return true;
        }
        
        // Check cache
        const cacheKey = `price_${coinId}_${currency}`;
        const cached = apiCache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp) < 60000) { // 1 minute cache
            sendResponse({ success: true, data: cached.data });
            return true;
        }
        
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currency}&include_24hr_change=true`;
        
        makeRequest(url)
            .then(data => {
                if (!data[coinId]) {
                    throw new Error(`Coin ${coinId} not found`);
                }
                
                apiCache.set(cacheKey, {
                    data: data,
                    timestamp: Date.now()
                });
                
                sendResponse({ success: true, data: data });
            })
            .catch(error => {
                console.error('Fetch error:', error);
                sendResponse({ success: false, error: error.message });
            });
        
        return true;
    }
    
    if (request.action === "fetchChart") {
        const coinId = request.coinId;
        const currency = request.currency || 'usd';
        
        const cacheKey = `chart_${coinId}_${currency}`;
        const cached = apiCache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp) < 300000) { // 5 minutes cache
            sendResponse({ success: true, data: cached.data });
            return true;
        }
        
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=7&interval=daily`;
        
        makeRequest(url)
            .then(data => {
                if (data && data.prices) {
                    apiCache.set(cacheKey, {
                        data: data,
                        timestamp: Date.now()
                    });
                    sendResponse({ success: true, data: data });
                } else {
                    throw new Error('Invalid chart data');
                }
            })
            .catch(error => {
                console.error('Chart fetch error:', error);
                sendResponse({ success: false, error: error.message });
            });
        
        return true;
    }
    
    if (request.action === "showNotification") {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234CAF50"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9v4c0 .83-.67 1.5-1.5 1.5S2 13.83 2 13V9c0-5.52 4.48-10 10-10s10 4.48 10 10v4c0 .83-.67 1.5-1.5 1.5S19 13.83 19 13V9c0-3.87-3.13-7-7-7z"/%3E%3C/svg%3E',
            title: request.title,
            message: request.message,
            priority: 2
        });
        sendResponse({ success: true });
        return true;
    }
});

// Check alerts periodically
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkAlerts') {
        checkPriceAlerts();
    } else if (alarm.name === 'keepAlive') {
        console.log('Service worker active');
    }
});

// Keep service worker alive
chrome.alarms.create('keepAlive', { periodInMinutes: 1 });

// Clear old cache periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of apiCache.entries()) {
        if (now - value.timestamp > 3600000) { // Clear cache after 1 hour
            apiCache.delete(key);
        }
    }
}, 3600000);