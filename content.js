// Full Address for Gmail - Content Script
// Extracts and displays full email addresses from Gmail's short handles

(function() {
    'use strict';

    // Function to create email display element
    function createEmailDisplay(fullEmail) {
        const emailDisplay = document.createElement('span');
        emailDisplay.textContent = ` (${fullEmail})`;
        emailDisplay.style.cssText = `
            color: #666;
            font-size: 0.9em;
            margin-left: 4px;
            opacity: 0.8;
        `;
        return emailDisplay;
    }

    // Function to process a single email span
    function processEmailSpan(span, fullEmail) {
        // Skip if we've already processed this span
        if (span.dataset.processed === 'true') {
            return;
        }
        
        // Skip inbox rows
        if (span.closest('tr.zA')) {
            return;
        }
        
        // Skip if this span already has a processed sibling
        const nextSibling = span.nextSibling;
        if (nextSibling && nextSibling.textContent && nextSibling.textContent.includes('(' + fullEmail + ')')) {
            span.dataset.processed = 'true';
            return;
        }
        
        // Create and insert the full email display element
        const emailDisplay = createEmailDisplay(fullEmail);
        span.parentNode.insertBefore(emailDisplay, span.nextSibling);
        
        // Mark as processed
        span.dataset.processed = 'true';
    }

    // Function to find and process email spans
    function processEmailSpans() {
        // Process spans with email attributes (Gmail's recipient display)
        const emailSpans = document.querySelectorAll('span[email]');
        emailSpans.forEach(span => {
            const fullEmail = span.getAttribute('email');
            processEmailSpan(span, fullEmail);
        });

        // Process spans with data-hovercard-id (recipient dropdown area)
        const hovercardSpans = document.querySelectorAll('span[data-hovercard-id]');
        hovercardSpans.forEach(span => {
            const fullEmail = span.getAttribute('data-hovercard-id');
            
            // Skip if it doesn't look like an email
            if (!fullEmail.includes('@')) {
                return;
            }
            
            processEmailSpan(span, fullEmail);
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
                            if (node.querySelector && (node.querySelector('span[email]') || node.querySelector('span[data-hovercard-id]'))) {
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
