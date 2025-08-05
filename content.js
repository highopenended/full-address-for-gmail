// Full Address for Gmail - Content Script
// Extracts and displays full email addresses from Gmail's short handles

(function() {
    'use strict';

    // Function to find and process email spans
    function processEmailSpans() {
        // Find all spans with email attributes (Gmail's recipient display)
        const emailSpans = document.querySelectorAll('span[email]');
        
        emailSpans.forEach(span => {
            const fullEmail = span.getAttribute('email');
            const shortName = span.getAttribute('name') || span.textContent;
            
            // Skip if we've already processed this span
            if (span.dataset.processed === 'true') {
                return;
            }
            
            // Create the full email display element
            const emailDisplay = document.createElement('span');
            emailDisplay.textContent = ` (${fullEmail})`;
            emailDisplay.style.cssText = `
                color: #666;
                font-size: 0.9em;
                margin-left: 4px;
                opacity: 0.8;
            `;
            
            // Insert the full email after the span
            span.parentNode.insertBefore(emailDisplay, span.nextSibling);
            
            // Mark as processed
            span.dataset.processed = 'true';
        });
    }

    // Function to handle dynamic content changes (Gmail is a SPA)
    function observeChanges() {
        const observer = new MutationObserver((mutations) => {
            let shouldProcess = false;
            
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if any new nodes contain email spans
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.querySelector && node.querySelector('span[email]')) {
                                shouldProcess = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldProcess) {
                // Small delay to ensure DOM is fully rendered
                setTimeout(processEmailSpans, 100);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize when DOM is ready
    function init() {
        // Process existing email spans
        processEmailSpans();
        
        // Set up observer for dynamic content
        observeChanges();
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
