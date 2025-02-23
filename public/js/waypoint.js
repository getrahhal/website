// Parse URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        ll: params.get('ll'),
        q: params.get('q'),
        t: params.get('t')
    };
}

// Initialize the page with location data
function initializePage() {
    const params = getUrlParams();
    if (!params.ll) {
        document.body.innerHTML = '<div class="location-card"><h1>Invalid Location</h1><p>This location link appears to be invalid.</p></div>';
        return;
    }

    const [lat, lng] = params.ll.split(',').map(coord => parseFloat(coord));
    const locationName = params.q || 'Marked Location';

    document.getElementById('locationName').textContent = locationName;
    document.getElementById('coordinates').textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

// Open in Apple Maps
function openInAppleMaps() {
    const params = getUrlParams();
    if (!params.ll) return;
    
    const url = `maps://maps.apple.com/?ll=${params.ll}&q=${encodeURIComponent(params.q || 'Marked Location')}`;
    window.location.href = url;
}

// Open in Google Maps
function openInGoogleMaps() {
    const params = getUrlParams();
    if (!params.ll) return;
    
    const [lat, lng] = params.ll.split(',');
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.location.href = url;
}

// Copy URL to clipboard
function copyUrl() {
    const button = document.querySelector('.copy-url-btn');
    const originalText = button.textContent;
    
    navigator.clipboard.writeText(window.location.href)
        .then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy URL:', err);
            button.textContent = 'Failed to copy';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage); 