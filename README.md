# Full Address for Gmail

A Chrome extension that displays the complete email address next to Gmail's short handles in the recipient field.

## What it does

Gmail often displays email addresses as short handles (like "info" instead of "info@thedignify.com"). This extension extracts the full email address from Gmail's internal data and displays it right next to the short handle.

**Before:** `to info ▼`  
**After:** `to info (info@thedignify.com) ▼`

## Installation

### Development Mode (Recommended for testing)

1. Clone this repository:
   ```bash
   git clone https://github.com/highopenended/full-address-for-gmail.git
   cd full-address-for-gmail
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the project folder

5. The extension will now be active when you visit Gmail

## How it works

The extension:
- Scans Gmail's DOM for `<span>` elements with `email` attributes
- Extracts the full email address from the `email` attribute
- Displays the complete address in parentheses next to the short handle
- Uses a MutationObserver to handle Gmail's dynamic content loading
- Prevents duplicate processing of the same elements

## Features

- ✅ Works with Gmail's dynamic interface
- ✅ Handles multiple recipients
- ✅ Non-intrusive styling (subtle gray text)
- ✅ No performance impact
- ✅ Automatically processes new emails as they load

## Development

The extension consists of:
- `manifest.json` - Extension configuration
- `content.js` - Main functionality
- `README.md` - This documentation

## License

MIT License - feel free to use and modify as needed.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

**Created by:** [Matt Glenn](https://github.com/highopenended)  
**GitHub:** [@highopenended](https://github.com/highopenended) 