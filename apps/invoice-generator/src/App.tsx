import InvoiceHeader from './components/invoice-header';

import './App.css'
import InvoiceItemForm from './components/invoice-item-form';

function App() {

  return (
    <main className='w-screen flex justify-center'>
      <div className='w-10/12 md:w-8/12 lg:w-4/12 min-h-64 mx-auto'>
        <InvoiceHeader/>
        <InvoiceItemForm/>
      </div>
    </main>
  )
}

export default App
