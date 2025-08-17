# Invoice Generator

A modern, responsive web application for creating and managing invoices. Built with React, TypeScript, and Tailwind CSS, this application provides a clean and intuitive interface for generating professional invoices.



## TODOS

- [ ] Add support for editing invoice items (not just deleting!)
- [ ] Implement persistent storage (localStorage or backend)
- [ ] Add PDF export or print functionality
- [ ] Improve form validation and error handling
- [ ] Add company logo upload option
- [ ] Support for multiple tax rates (not just 20% VAT)
- [ ] Internationalization (i18n) for multi-language support
- [ ] Add unit tests for components and utilities
- [ ] Make the UI even more fabulous (because invoices can be fun too! 🎨)

## Features

- **Dynamic Invoice Creation**: Add multiple service items with custom names and prices
- **Real-time Total Calculation**: Automatically calculates the total amount as you add items
- **Item Management**: Add and remove invoice items with ease
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with Tailwind CSS styling
- **Type Safety**: Built with TypeScript for better development experience
- **Form Validation**: Input validation with user-friendly error messages

## Technology Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.12
- **Build Tool**: Vite 7.1.2
- **ID Generation**: CUID2 for unique item identification
- **Development Tools**: ESLint, TypeScript ESLint

## Project Structure

```
src/
├── components/
│   ├── invoice-header.tsx          # Header component with company branding
│   ├── invoice-item-form.tsx       # Main form for adding invoice items
│   ├── invoice-item-form-input-groups.tsx  # Input field components
│   ├── invoice-item.tsx            # Individual invoice item display
│   ├── invoice-table.tsx           # Table displaying all invoice items
│   └── invoice-total.tsx           # Total calculation and display
├── App.tsx                         # Main application component
└── main.tsx                        # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd apps/invoice-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Usage

1. **Adding Invoice Items**: Use the form at the top to add service items
   - Enter the service name in the "Service" field
   - Enter the price in the "Prix HT" field
   - Click "Ajouter" to add the item to your invoice

2. **Managing Items**: 
   - View all added items in the table below
   - Remove items by clicking the delete button next to each item
   - The total is automatically calculated and displayed

3. **Generating Invoice**: Click the "Générer la facture" button to generate the final invoice

## Key Components

### InvoiceItemForm
The main component that manages the state of invoice items and handles form submissions. It includes:
- State management for invoice items
- Form validation and error handling
- Total calculation logic

### InvoiceTable
Displays all invoice items in a responsive table format with:
- Sticky header for better navigation
- Scrollable content area
- Delete functionality for individual items

### InvoiceHeader
Contains the company branding and invoice title, styled with a professional header design.

## Development Notes

- The application uses React Server Actions for form handling
- CUID2 is used for generating unique IDs for invoice items
- Tailwind CSS provides utility-first styling
- The interface is in French, reflecting the business context

## Future Enhancements

- PDF generation functionality
- Invoice templates and customization
- Data persistence and export options
- Customer information management
- Tax calculation features
- Invoice numbering and date management

## Contributing

This project is part of a React practices workspace. Feel free to experiment with the code and add new features to enhance your learning experience.

## License

This project is for educational and practice purposes.
