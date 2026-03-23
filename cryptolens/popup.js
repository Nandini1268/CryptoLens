document.addEventListener('DOMContentLoaded', () => {
    const darkToggle = document.getElementById('darkToggle');
    const currSelect = document.getElementById('currSelect');
    const statusDiv = document.getElementById('status');
    const alertsList = document.getElementById('alerts-list');

    if (!darkToggle || !currSelect) {
        console.error('Elements not found');
        return;
    }

    // Load saved settings
    chrome.storage.local.get(['darkMode', 'currency'], (res) => {
        if (chrome.runtime.lastError) {
            console.error('Storage error:', chrome.runtime.lastError);
            return;
        }
        
        darkToggle.checked = res.darkMode || false;
        currSelect.value = res.currency || 'usd';
        
        if (res.darkMode) {
            document.body.classList.add('dark-mode');
        }
    });

    // Load and display alerts
    function loadAlerts() {
        chrome.storage.local.get(['priceAlerts'], (res) => {
            const alerts = res.priceAlerts || [];
            const activeAlerts = alerts.filter(a => !a.triggered);
            
            if (activeAlerts.length === 0) {
                alertsList.innerHTML = '<div class="no-alerts">No active alerts</div>';
                return;
            }
            
            alertsList.innerHTML = activeAlerts.map(alert => `
                <div class="alert-item" data-id="${alert.id}">
                    <div>
                        <strong>${alert.coinName.toUpperCase()}</strong><br>
                        ${alert.condition === 'above' ? '↑ Above' : '↓ Below'} ${alert.targetPrice} ${alert.currency.toUpperCase()}
                    </div>
                    <span class="delete-alert" data-id="${alert.id}">🗑️</span>
                </div>
            `).join('');
            
            // Add delete handlers
            document.querySelectorAll('.delete-alert').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const id = parseInt(btn.dataset.id);
                    await deleteAlert(id);
                    loadAlerts();
                    statusDiv.textContent = 'Alert deleted';
                    setTimeout(() => { statusDiv.textContent = '✓ Ready'; }, 2000);
                });
            });
        });
    }
    
    async function deleteAlert(id) {
        const result = await chrome.storage.local.get(['priceAlerts']);
        const alerts = result.priceAlerts || [];
        const filteredAlerts = alerts.filter(a => a.id !== id);
        await chrome.storage.local.set({ priceAlerts: filteredAlerts });
    }
    
    loadAlerts();

    // Save Settings
    darkToggle.addEventListener('change', () => {
        chrome.storage.local.set({ darkMode: darkToggle.checked }, () => {
            if (chrome.runtime.lastError) {
                statusDiv.textContent = 'Error saving';
            } else {
                statusDiv.textContent = '✓ Dark mode saved';
                setTimeout(() => { statusDiv.textContent = '✓ Ready'; }, 2000);
                
                if (darkToggle.checked) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
            }
        });
    });

    currSelect.addEventListener('change', () => {
        chrome.storage.local.set({ currency: currSelect.value }, () => {
            if (chrome.runtime.lastError) {
                statusDiv.textContent = 'Error saving';
            } else {
                statusDiv.textContent = `✓ Currency set to ${currSelect.value.toUpperCase()}`;
                setTimeout(() => { statusDiv.textContent = '✓ Ready'; }, 2000);
            }
        });
    });
});