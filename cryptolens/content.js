// Complete cryptocurrency mapping with ALL coins
const COINS = {
    // Bitcoin
    'bitcoin': 'bitcoin', 'btc': 'bitcoin',
    
    // Litecoin
    'litecoin': 'litecoin', 'ltc': 'litecoin',
    
    // Namecoin
    'namecoin': 'namecoin', 'nmc': 'namecoin',
    
    // Ethereum
    'ethereum': 'ethereum', 'eth': 'ethereum',
    
    // Solana
    'solana': 'solana', 'sol': 'solana',
    
    // Binance
    'binance coin': 'binancecoin', 'bnb': 'binancecoin',
    
    // Cardano
    'cardano': 'cardano', 'ada': 'cardano',
    
    // Ripple
    'ripple': 'ripple', 'xrp': 'ripple',
    
    // Dogecoin
    'dogecoin': 'dogecoin', 'doge': 'dogecoin',
    
    // Polkadot
    'polkadot': 'polkadot', 'dot': 'polkadot',
    
    // Chainlink
    'chainlink': 'chainlink', 'link': 'chainlink',
    
    // Avalanche
    'avalanche': 'avalanche-2', 'avax': 'avalanche-2',
    
    // Polygon
    'polygon': 'matic-network', 'matic': 'matic-network',
    
    // Uniswap
    'uniswap': 'uniswap', 'uni': 'uniswap',
    
    // Cosmos
    'cosmos': 'cosmos', 'atom': 'cosmos',
    
    // Algorand
    'algorand': 'algorand', 'algo': 'algorand',
    
    // Stellar
    'stellar': 'stellar', 'xlm': 'stellar',
    
    // VeChain
    'vechain': 'vechain', 'vet': 'vechain',
    
    // Filecoin
    'filecoin': 'filecoin', 'fil': 'filecoin',
    
    // Hedera
    'hedera': 'hedera', 'hbar': 'hedera',
    
    // Near
    'near': 'near',
    
    // Aptos
    'aptos': 'aptos', 'apt': 'aptos',
    
    // Arbitrum
    'arbitrum': 'arbitrum', 'arb': 'arbitrum',
    
    // Optimism
    'optimism': 'optimism', 'op': 'optimism',
    
    // Sui
    'sui': 'sui',
    
    // Injective
    'injective': 'injective', 'inj': 'injective',
    
    // Render
    'render': 'render-token', 'rndr': 'render-token',
    
    // The Graph
    'the graph': 'the-graph', 'grt': 'the-graph',
    
    // Immutable X
    'immutable x': 'immutable-x', 'imx': 'immutable-x',
    
    // Stacks
    'stacks': 'stacks', 'stx': 'stacks',
    
    // Kaspa
    'kaspa': 'kaspa', 'kas': 'kaspa',
    
    // Fantom
    'fantom': 'fantom', 'ftm': 'fantom',
    
    // Thorchain
    'thorchain': 'thorchain', 'rune': 'thorchain',
    
    // Arweave
    'arweave': 'arweave', 'ar': 'arweave',
    
    // The Sandbox
    'the sandbox': 'the-sandbox', 'sand': 'the-sandbox',
    
    // Decentraland
    'decentraland': 'decentraland', 'mana': 'decentraland',
    
    // Axie Infinity
    'axie infinity': 'axie-infinity', 'axs': 'axie-infinity',
    
    // Monero
    'monero': 'monero', 'xmr': 'monero',
    
    // Aave
    'aave': 'aave',
    
    // Maker
    'maker': 'maker', 'mkr': 'maker',
    
    // Compound
    'compound': 'compound', 'comp': 'compound',
    
    // Curve
    'curve': 'curve-dao-token', 'crv': 'curve-dao-token',
    
    // Yearn
    'yearn': 'yearn-finance', 'yfi': 'yearn-finance',
    
    // Synthetix
    'synthetix': 'synthetix', 'snx': 'synthetix',
    
    // 1inch
    '1inch': '1inch',
    
    // Zcash
    'zcash': 'zcash', 'zec': 'zcash',
    
    // Dash
    'dash': 'dash',
    
    // EOS
    'eos': 'eos',
    
    // Tezos
    'tezos': 'tezos', 'xtz': 'tezos',
    
    // NEO
    'neo': 'neo',
    
    // IOTA
    'iota': 'iota', 'miota': 'iota',
    
    // Ontology
    'ontology': 'ontology', 'ont': 'ontology',
    
    // Qtum
    'qtum': 'qtum',
    
    // Waves
    'waves': 'waves',
    
    // Zilliqa
    'zilliqa': 'zilliqa', 'zil': 'zilliqa',
    
    // Siacoin
    'siacoin': 'siacoin', 'sc': 'siacoin',
    
    // Decred
    'decred': 'decred', 'dcr': 'decred',
    
    // DigiByte
    'digibyte': 'digibyte', 'dgb': 'digibyte',
    
    // Vertcoin
    'vertcoin': 'vertcoin', 'vtc': 'vertcoin',
    
    // STABLECOINS
    'tether': 'tether', 'usdt': 'tether',
    'usd coin': 'usd-coin', 'usdc': 'usd-coin',
    'dai': 'dai',
    'binance usd': 'binance-usd', 'busd': 'binance-usd',
    
    // ALTCOINS
    'shiba inu': 'shiba-inu', 'shib': 'shiba-inu',
    'pepe': 'pepe',
    'bonk': 'bonk',
    'floki': 'floki',
    'celestia': 'celestia', 'tia': 'celestia',
    'sei': 'sei',
    'jupiter': 'jupiter', 'jup': 'jupiter'
};

// Currency symbols
const SYMBOLS = { 
    'usd': '$', 
    'eur': '€', 
    'inr': '₹'
};

let priceCache = {};
let hoverTimeout = null;
let activeRequests = new Map();

// Create tooltip element
function createTooltip() {
    let tip = document.getElementById('cl-tip');
    if (!tip) {
        tip = document.createElement('div');
        tip.id = 'cl-tip';
        tip.style.cssText = `
            position: absolute;
            background: white;
            padding: 12px 15px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            display: none;
            z-index: 1000000;
            min-width: 240px;
            max-width: 280px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            border: 1px solid #eee;
            pointer-events: auto;
            font-size: 13px;
        `;
        document.body.appendChild(tip);
        
        tip.addEventListener('mouseenter', () => {
            if (hoverTimeout) clearTimeout(hoverTimeout);
        });
        
        tip.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                tip.style.display = 'none';
            }, 200);
        });
    }
    return tip;
}

// Highlight all cryptocurrency text on the page
function highlightAllCryptos() {
    try {
        // Remove existing highlights
        const existingHighlights = document.querySelectorAll('.crypto-highlight');
        existingHighlights.forEach(el => {
            const parent = el.parentNode;
            if (parent && parent !== document.body) {
                const textNode = document.createTextNode(el.textContent);
                parent.replaceChild(textNode, el);
            }
        });
        
        // Find all text nodes
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (node.parentElement && 
                        (node.parentElement.tagName === 'SCRIPT' || 
                         node.parentElement.tagName === 'STYLE' ||
                         node.parentElement.tagName === 'NOSCRIPT' ||
                         node.parentElement.classList?.contains('crypto-highlight') ||
                         node.parentElement.id === 'cl-tip')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        const textNodes = [];
        while (walker.nextNode()) {
            if (walker.currentNode.textContent && walker.currentNode.textContent.trim().length > 0) {
                textNodes.push(walker.currentNode);
            }
        }
        
        // Process each text node
        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            if (!text || text.length < 2) return;
            
            const cryptoMatches = findCryptoMatches(text);
            
            if (cryptoMatches.length > 0) {
                let newHTML = text;
                let offset = 0;
                
                cryptoMatches.forEach(match => {
                    const start = match.index + offset;
                    const end = match.index + match.text.length + offset;
                    const highlightedText = `<span class="crypto-highlight" data-coin-id="${match.coinId}" data-coin-name="${match.text}" style="background: linear-gradient(120deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.1) 100%); border-bottom: 2px solid #4CAF50; cursor: pointer; font-weight: 500; transition: all 0.2s ease; padding: 2px 4px; border-radius: 4px; display: inline-block;">${escapeHtml(match.text)}</span>`;
                    newHTML = newHTML.slice(0, start) + highlightedText + newHTML.slice(end);
                    offset += highlightedText.length - match.text.length;
                });
                
                const span = document.createElement('span');
                span.innerHTML = newHTML;
                
                try {
                    textNode.parentNode.replaceChild(span, textNode);
                    
                    // Add event listeners
                    span.querySelectorAll('.crypto-highlight').forEach(el => {
                        el.addEventListener('mouseenter', (e) => {
                            e.stopPropagation();
                            const rect = el.getBoundingClientRect();
                            showCryptoPopup(el.dataset.coinName, el.dataset.coinId, rect);
                        });
                    });
                } catch (e) {
                    console.warn('Error replacing text node:', e);
                }
            }
        });
        
        console.log(`✅ Highlighted ${document.querySelectorAll('.crypto-highlight').length} cryptocurrency mentions`);
    } catch (error) {
        console.error('Error in highlightAllCryptos:', error);
    }
}

// Find cryptocurrency matches in text
function findCryptoMatches(text) {
    const matches = [];
    const lowerText = text.toLowerCase();
    
    // Common crypto terms to look for
    const cryptoTerms = [
        'btc', 'bitcoin', 'eth', 'ethereum', 'ltc', 'litecoin', 'nmc', 'namecoin',
        'sol', 'solana', 'bnb', 'cardano', 'ada', 'xrp', 'ripple', 'doge', 'dogecoin',
        'dot', 'polkadot', 'link', 'chainlink', 'avax', 'avalanche', 'matic', 'polygon',
        'uni', 'uniswap', 'atom', 'cosmos', 'algo', 'algorand', 'xlm', 'stellar',
        'vet', 'vechain', 'fil', 'filecoin', 'hbar', 'hedera', 'near', 'aptos', 'apt',
        'arb', 'arbitrum', 'op', 'optimism', 'sui', 'inj', 'injective', 'rndr', 'render',
        'grt', 'the graph', 'imx', 'immutable', 'stx', 'stacks', 'kas', 'kaspa',
        'ftm', 'fantom', 'rune', 'thorchain', 'ar', 'arweave', 'sand', 'the sandbox',
        'mana', 'decentraland', 'axs', 'axie', 'xmr', 'monero', 'usdt', 'tether',
        'usdc', 'usd coin', 'dai', 'busd', 'shib', 'shiba inu', 'pepe', 'bonk', 'floki'
    ];
    
    for (const term of cryptoTerms) {
        try {
            const regex = new RegExp(`\\b${escapeRegex(term)}\\b`, 'gi');
            let match;
            
            while ((match = regex.exec(lowerText)) !== null) {
                const originalMatch = text.substring(match.index, match.index + match[0].length);
                const coinId = getCoinIdFromTerm(term);
                
                if (coinId) {
                    matches.push({
                        text: originalMatch,
                        index: match.index,
                        coinId: coinId
                    });
                }
            }
        } catch (e) {
            continue;
        }
    }
    
    // Remove duplicates
    const uniqueMatches = [];
    const seen = new Set();
    
    for (const match of matches.sort((a, b) => a.index - b.index)) {
        const key = `${match.index}-${match.text}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueMatches.push(match);
        }
    }
    
    return uniqueMatches;
}

function getCoinIdFromTerm(term) {
    const mapping = {
        'btc': 'bitcoin', 'bitcoin': 'bitcoin',
        'eth': 'ethereum', 'ethereum': 'ethereum',
        'ltc': 'litecoin', 'litecoin': 'litecoin',
        'nmc': 'namecoin', 'namecoin': 'namecoin',
        'sol': 'solana', 'solana': 'solana',
        'bnb': 'binancecoin', 'binance': 'binancecoin',
        'ada': 'cardano', 'cardano': 'cardano',
        'xrp': 'ripple', 'ripple': 'ripple',
        'doge': 'dogecoin', 'dogecoin': 'dogecoin',
        'dot': 'polkadot', 'polkadot': 'polkadot',
        'link': 'chainlink', 'chainlink': 'chainlink',
        'avax': 'avalanche-2', 'avalanche': 'avalanche-2',
        'matic': 'matic-network', 'polygon': 'matic-network',
        'uni': 'uniswap', 'uniswap': 'uniswap',
        'atom': 'cosmos', 'cosmos': 'cosmos',
        'algo': 'algorand', 'algorand': 'algorand',
        'xlm': 'stellar', 'stellar': 'stellar',
        'vet': 'vechain', 'vechain': 'vechain',
        'fil': 'filecoin', 'filecoin': 'filecoin',
        'hbar': 'hedera', 'hedera': 'hedera',
        'near': 'near',
        'apt': 'aptos', 'aptos': 'aptos',
        'arb': 'arbitrum', 'arbitrum': 'arbitrum',
        'op': 'optimism', 'optimism': 'optimism',
        'sui': 'sui',
        'inj': 'injective', 'injective': 'injective',
        'rndr': 'render-token', 'render': 'render-token',
        'grt': 'the-graph', 'the graph': 'the-graph',
        'imx': 'immutable-x', 'immutable': 'immutable-x',
        'stx': 'stacks', 'stacks': 'stacks',
        'kas': 'kaspa', 'kaspa': 'kaspa',
        'ftm': 'fantom', 'fantom': 'fantom',
        'rune': 'thorchain', 'thorchain': 'thorchain',
        'ar': 'arweave', 'arweave': 'arweave',
        'sand': 'the-sandbox', 'the sandbox': 'the-sandbox',
        'mana': 'decentraland', 'decentraland': 'decentraland',
        'axs': 'axie-infinity', 'axie': 'axie-infinity',
        'xmr': 'monero', 'monero': 'monero',
        'usdt': 'tether', 'tether': 'tether',
        'usdc': 'usd-coin', 'usd coin': 'usd-coin',
        'dai': 'dai',
        'busd': 'binance-usd', 'binance usd': 'binance-usd',
        'shib': 'shiba-inu', 'shiba inu': 'shiba-inu',
        'pepe': 'pepe',
        'bonk': 'bonk',
        'floki': 'floki'
    };
    
    return mapping[term.toLowerCase()] || null;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Show cryptocurrency popup
function showCryptoPopup(text, coinId, rect) {
    const tip = createTooltip();
    
    // Cancel any pending request for this coin
    if (activeRequests.has(coinId)) {
        return;
    }
    
    chrome.storage.local.get(['currency', 'darkMode'], async (settings) => {
        const currency = settings.currency || 'usd';
        const darkMode = settings.darkMode || false;
        
        // Position tooltip
        const tipWidth = 280;
        const tipHeight = 380;
        let left = rect.right + 10;
        let top = rect.top;
        
        if (left + tipWidth > window.innerWidth) {
            left = rect.left - tipWidth - 10;
        }
        if (top + tipHeight > window.innerHeight) {
            top = window.innerHeight - tipHeight - 10;
        }
        if (top < 0) top = 10;
        if (left < 5) left = 5;
        
        tip.style.left = left + 'px';
        tip.style.top = top + 'px';
        tip.style.display = 'block';
        
        // Apply dark mode
        if (darkMode) {
            tip.style.background = '#1a1a1b';
            tip.style.color = 'white';
            tip.style.borderColor = '#333';
        } else {
            tip.style.background = 'white';
            tip.style.color = 'black';
            tip.style.borderColor = '#eee';
        }
        
        // Show loading
        tip.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <div style="display:inline-block; width:24px; height:24px; border:2px solid ${darkMode ? '#333' : '#f3f3f3'}; border-top:2px solid #4CAF50; border-radius:50%; animation: spin 0.6s linear infinite;"></div>
                <div style="margin-top:10px;">Loading ${escapeHtml(text.toUpperCase())}...</div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        
        try {
            // Fetch price data
            const priceData = await fetchPriceWithRetry(coinId, currency);
            
            if (!priceData || !priceData[coinId]) {
                throw new Error('No price data available');
            }
            
            const coinData = priceData[coinId];
            const currentPrice = coinData[currency];
            const change24h = coinData[currency + '_24h_change'] || 0;
            const changeColor = change24h >= 0 ? '#4CAF50' : '#f44336';
            const changeSign = change24h >= 0 ? '+' : '';
            
            // Try to fetch chart data (optional, don't fail if it doesn't work)
            let chartHtml = '<div style="text-align:center; color:#888; font-size:11px; margin:10px 0;">📊 Chart data unavailable</div>';
            try {
                const chartData = await fetchChartData(coinId, currency);
                if (chartData && chartData.prices) {
                    const prices = chartData.prices.slice(-7).map(p => p[1]);
                    chartHtml = createSimpleChart(prices, darkMode);
                }
            } catch (chartError) {
                console.log('Chart data not available for', coinId);
            }
            
            // Display price info
            tip.innerHTML = `
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid ${darkMode ? '#333' : '#eee'}; padding-bottom:8px; margin-bottom:10px;">
                        <strong style="font-size:16px;">${escapeHtml(text.toUpperCase())}</strong>
                        <span id="refresh-tip" style="cursor:pointer; font-size:14px; padding:2px 6px; opacity:0.7;">↻</span>
                    </div>
                    
                    <div style="font-size:28px; font-weight:bold; margin:10px 0;">
                        ${formatPrice(currentPrice, currency)}
                    </div>
                    
                    <div style="color:${changeColor}; font-size:13px; margin-bottom:12px;">
                        ${changeSign}${change24h.toFixed(2)}% (24h)
                    </div>
                    
                    <div style="margin:10px 0;">
                        ${chartHtml}
                    </div>
                    
                    <div style="margin-top:12px; padding-top:8px; border-top:1px solid ${darkMode ? '#333' : '#eee'};">
                        <div style="font-size:11px; font-weight:500; margin-bottom:6px;">🔔 Set Alert</div>
                        <div style="display:flex; gap:6px;">
                            <input type="number" id="alert-target" placeholder="Price" 
                                   style="flex:1; padding:5px; border:1px solid ${darkMode ? '#444' : '#ddd'}; border-radius:4px; background:${darkMode ? '#2a2a2b' : 'white'}; color:${darkMode ? 'white' : 'black'}; font-size:11px;">
                            <select id="alert-condition" style="padding:5px; border:1px solid ${darkMode ? '#444' : '#ddd'}; border-radius:4px; background:${darkMode ? '#2a2a2b' : 'white'}; color:${darkMode ? 'white' : 'black'}; font-size:11px;">
                                <option value="above">Above</option>
                                <option value="below">Below</option>
                            </select>
                            <button id="set-alert-tip" style="padding:5px 10px; background:#4CAF50; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Set</button>
                        </div>
                        <div id="alert-status" style="font-size:10px; margin-top:6px; text-align:center;"></div>
                    </div>
                    
                    <div style="font-size:9px; color:#888; margin-top:10px; text-align:center;">
                        Updated ${new Date().toLocaleTimeString()}
                    </div>
                </div>
            `;
            
            // Add event listeners
            const refreshBtn = document.getElementById('refresh-tip');
            if (refreshBtn) {
                refreshBtn.onclick = () => {
                    const cacheKey = `${coinId}_${currency}`;
                    delete priceCache[cacheKey];
                    showCryptoPopup(text, coinId, rect);
                };
            }
            
            const setAlertBtn = document.getElementById('set-alert-tip');
            if (setAlertBtn) {
                setAlertBtn.onclick = async () => {
                    const targetPrice = document.getElementById('alert-target').value;
                    const condition = document.getElementById('alert-condition').value;
                    const statusDiv = document.getElementById('alert-status');
                    
                    if (!targetPrice || targetPrice <= 0) {
                        statusDiv.textContent = '⚠️ Enter valid price';
                        statusDiv.style.color = '#f44336';
                        return;
                    }
                    
                    statusDiv.textContent = 'Setting alert...';
                    statusDiv.style.color = '#888';
                    
                    const result = await setAlert(coinId, text, targetPrice, condition, currency);
                    
                    statusDiv.textContent = result.message;
                    statusDiv.style.color = result.success ? '#4CAF50' : '#f44336';
                    
                    if (result.success) {
                        setTimeout(() => {
                            statusDiv.textContent = '';
                        }, 2000);
                    }
                };
            }
            
        } catch (error) {
            console.error('Error loading coin data:', error);
            tip.innerHTML = `
                <div style="padding:20px; text-align:center;">
                    <div style="color:#f44336; margin-bottom:8px;">❌ Error</div>
                    <div style="font-size:11px; color:#888; margin-bottom:10px;">${error.message || 'Failed to load price data'}</div>
                    <button id="retry-tip" style="padding:5px 12px; background:#4CAF50; color:white; border:none; border-radius:4px; cursor:pointer;">Retry</button>
                </div>
            `;
            
            const retryBtn = document.getElementById('retry-tip');
            if (retryBtn) {
                retryBtn.onclick = () => {
                    const cacheKey = `${coinId}_${currency}`;
                    delete priceCache[cacheKey];
                    showCryptoPopup(text, coinId, rect);
                };
            }
        } finally {
            activeRequests.delete(coinId);
        }
    });
}

// Fetch price with retry
async function fetchPriceWithRetry(coinId, currency, retries = 2) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fetchPrice(coinId, currency);
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

// Fetch price from background
function fetchPrice(coinId, currency) {
    return new Promise((resolve, reject) => {
        const cacheKey = `${coinId}_${currency}`;
        const cached = priceCache[cacheKey];
        
        if (cached && (Date.now() - cached.timestamp) < 30000) {
            resolve(cached.data);
            return;
        }
        
        chrome.runtime.sendMessage({ 
            action: "fetchPrice", 
            coinId: coinId, 
            currency: currency 
        }, (response) => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
            }
            
            if (response && response.success && response.data) {
                priceCache[cacheKey] = {
                    data: response.data,
                    timestamp: Date.now()
                };
                resolve(response.data);
            } else {
                reject(new Error(response?.error || 'Failed to fetch price'));
            }
        });
    });
}

// Fetch chart data
function fetchChartData(coinId, currency) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ 
            action: "fetchChart", 
            coinId: coinId, 
            currency: currency 
        }, (response) => {
            if (chrome.runtime.lastError || !response?.success) {
                resolve(null);
                return;
            }
            resolve(response.data);
        });
    });
}

// Create simple chart
function createSimpleChart(prices, darkMode) {
    if (!prices || prices.length === 0) {
        return '<div style="text-align:center; padding:10px; color:#888;">📊 No chart data</div>';
    }
    
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const range = max - min;
    const height = 40;
    
    let chart = '<div style="display:flex; gap:3px; align-items:flex-end; margin:10px 0;">';
    
    for (let i = 0; i < Math.min(prices.length, 7); i++) {
        const price = prices[i];
        let barHeight = 4;
        
        if (range > 0) {
            barHeight = Math.max(4, ((price - min) / range) * height);
        }
        
        const isUp = i > 0 && price >= prices[i-1];
        const color = isUp ? '#4CAF50' : '#f44336';
        
        chart += `
            <div style="flex:1; text-align:center;">
                <div style="background:${color}; height:${barHeight}px; border-radius:2px; margin-bottom:4px;"></div>
                <div style="font-size:8px; color:#888;">${i === 0 ? '7d' : i === 6 ? 'Now' : ''}</div>
            </div>
        `;
    }
    
    chart += '</div>';
    return chart;
}

// Format price
function formatPrice(price, currency) {
    const symbol = SYMBOLS[currency] || '$';
    if (price === undefined || price === null) return `${symbol}0.00`;
    if (price < 0.01) return `${symbol}${price.toFixed(6)}`;
    if (price < 1) return `${symbol}${price.toFixed(4)}`;
    if (price < 1000) return `${symbol}${price.toFixed(2)}`;
    return `${symbol}${price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// Set alert
async function setAlert(coinId, coinName, targetPrice, condition, currency) {
    const alert = {
        id: Date.now(),
        coinId: coinId,
        coinName: coinName,
        targetPrice: parseFloat(targetPrice),
        condition: condition,
        currency: currency,
        createdAt: new Date().toISOString(),
        triggered: false
    };
    
    const result = await new Promise(resolve => {
        chrome.storage.local.get(['priceAlerts'], resolve);
    });
    
    const alerts = result.priceAlerts || [];
    
    const exists = alerts.some(a => 
        a.coinId === coinId && 
        a.targetPrice === alert.targetPrice && 
        a.condition === condition && 
        !a.triggered
    );
    
    if (exists) {
        return { success: false, message: '⚠️ Alert already exists!' };
    }
    
    alerts.push(alert);
    
    await new Promise(resolve => {
        chrome.storage.local.set({ priceAlerts: alerts }, resolve);
    });
    
    return { success: true, message: '✓ Alert set! You will be notified.' };
}

// Initialize highlighting when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(highlightAllCryptos, 1000);
    });
} else {
    setTimeout(highlightAllCryptos, 1000);
}

// Re-run highlighting when DOM changes
const observer = new MutationObserver((mutations) => {
    // Debounce to avoid too many updates
    if (highlightTimeout) clearTimeout(highlightTimeout);
    highlightTimeout = setTimeout(highlightAllCryptos, 500);
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

console.log('%c✨ CryptoLens Pro Active! Hover over any cryptocurrency name', 'color: #4CAF50; font-size: 14px; font-weight: bold;');
console.log('%cSupported: BTC, ETH, LTC, NMC, SOL, ADA, DOGE, and 100+ more coins', 'color: #888; font-size: 12px;');