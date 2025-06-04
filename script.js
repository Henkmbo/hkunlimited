

// Self-executing function to prevent horizontal scrolling only
(function() {
    // Apply styles immediately and on DOMContentLoaded for redundancy
    function preventHorizontalScrollOnly() {
        // Only prevent horizontal scrolling, allow vertical
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflowX = 'hidden';
        
        // Remove any fixed positioning that would prevent vertical scrolling
        document.body.style.position = '';
        document.body.style.height = '';
    }
    
    // Apply immediately
    preventHorizontalScrollOnly();
    
    // Also apply when DOM is loaded (for reliability)
    document.addEventListener('DOMContentLoaded', function() {
        preventHorizontalScrollOnly();
    });
})();