# John Pye True Price Calculator

A Chrome extension that automatically calculates and displays the true cost of items on John Pye Auctions, including all fees and taxes.

## Features

- **Automatic Fee Calculation**: Adds VAT and Buyer's Premium to all displayed prices
- **Multi-Page Support**: Works on lot details, watching pages, and auction listings
- **Real-Time Updates**: Calculates prices as you browse
- **Clean Integration**: Seamlessly integrates with existing John Pye website design
- **Manifest V3**: Built with the latest Chrome extension standards

## How It Works

The extension automatically detects auction prices and calculates:
- **VAT**: 20% on hammer price
- **Buyer's Premium**: 25% on hammer price  
- **VAT on Buyer's Premium**: 20% on the buyer's premium amount

**Example**: A £100 item becomes £150.00 total (£100 + £20 VAT + £25 BP + £5 VAT on BP)

## Installation

### Step 1: Download the Extension
1. Go to this GitHub repository
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to a folder on your computer

### Step 2: Load in Chrome
1. Open Google Chrome
2. Type `chrome://extensions/` in the address bar and press Enter
3. Enable "Developer mode" by toggling the switch in the top-right corner
4. Click "Load unpacked" button
5. Navigate to and select the extracted folder containing the extension files
6. Click "Select Folder"

### Step 3: Verify Installation
- The extension should now appear in your extensions list
- You should see "John Pye True Price Calculator" with a red icon
- The extension will automatically activate when you visit John Pye auction pages

## Supported Pages

- ✅ Lot Details pages (`/Event/LotDetails/*`)
- ✅ Watching/Bidding pages (`/Account/Bidding/Watching`)
- ✅ Auction Listings (`/Event/Details/*`)

## How to Use

1. **Install the extension** using the instructions above
2. **Visit any John Pye auction page** (lot details, watching page, or auction listings)
3. **See true prices automatically calculated** - they appear in red text below the original prices
4. **No additional setup required** - the extension works automatically

## Technical Details

- **Manifest Version**: 3
- **Permissions**: `activeTab` only (minimal permissions)
- **Content Scripts**: Automatically injects on John Pye auction pages
- **Browser Support**: Chrome and Chromium-based browsers (Edge, Brave, etc.)

## Troubleshooting

- **Extension not working?** Make sure you're on a John Pye auction page
- **Prices not showing?** Try refreshing the page
- **Still having issues?** Check that the extension is enabled in `chrome://extensions/`

## File Structure

```
john-pye-true-price-calculator/
├── manifest.json          # Extension configuration
├── content.js            # Main functionality
├── popup.html            # Extension popup
├── images/
│   └── icon.svg          # Extension icon
└── README.md             # This file
```