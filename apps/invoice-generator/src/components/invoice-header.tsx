export default function InvoiceHeader() {
  return (
    <header className="bg-slate-300 p-8">
      <div className="w-full flex flex-col md:justify-center md:items-center">
        <h1 className="font-semibold text-black">Invoice Creator</h1>
        <p className="text-left md:text-center text-black">
          Merci d'avoir choisi Dupont SARL
        </p>
      </div>
    </header>
  );
}
