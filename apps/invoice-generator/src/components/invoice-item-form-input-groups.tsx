export default function InvoiceItemFormInputGroups() {
  return (
    <>
    
    <div className="w-10/12">
    <label htmlFor="name">
      <input
        className="w-6/6 p-2 h-10 bg-white border-1 border-gray-200 text-black"
        type="text"
        id="name"
        name="name"
      />
    </label>
  </div>
  <div>
    <select
      name="value"
      id="value"
      className="bg-gray-100 p-2 h-10 border-1 border-gray-200 text-black cursor-pointer"
    >
      <option value="10€">10€</option>
      <option value="20€">20€</option>
      <option value="30€">30€</option>
      <option value="40€">40€</option>
      <option value="50€">50€</option>
      <option value="60€">60€</option>
      <option value="70€">70€</option>
      <option value="80€">80€</option>
    </select>
  </div>
  <div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 p-2 h-10 rounded-tr rounded-br cursor-pointer"
      aria-label="Ajouter un élement"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <rect x="9" y="4" width="2" height="12" fill="white" />
        <rect x="4" y="9" width="12" height="2" fill="white" />
      </svg>
    </button>
    </div>
    </>
  );
}