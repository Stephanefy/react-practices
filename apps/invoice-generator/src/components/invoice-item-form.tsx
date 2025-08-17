import { useState } from "react";
import { InvoiceTable } from "./invoice-table";
import { createId } from "@paralleldrive/cuid2";
import InvoiceTotal from "./invoice-total";
import InvoiceItemFormInputGroups from "./invoice-item-form-input-groups";

export interface InvoiceItemInterface {
  id: string;
  name: string;
  value: number;
}

export default function InvoiceItemForm() {
  const [invoiceItems, setInvoiceItems] = useState<Array<InvoiceItemInterface>>([]);
  const [error, setError] = useState<string | null>(null);

  const addInvoiceItem = (formData: FormData) => {
    const id = createId();
    const name = formData.get("name") as string;
    const value = formData.get("value") as string;

    if (name && value) {
      setInvoiceItems([...invoiceItems, { id, name, value: parseInt(value) }]);
      setError(null);
    } else {
        setError("Veuillez renseigner le nom et la valeur du service");
        setTimeout(() => {
            setError(null);
        }, 3000);
    }
  };

  const total = invoiceItems.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="relative bg-slate-200 p-5 h-[600px]">
      <form
        action={addInvoiceItem}
        className="w-full flex items-center space-x-0 p-8"
      >
        <InvoiceItemFormInputGroups />
      </form>
      {error && <p className="text-red-500 text-center absolute top-4 left-0 w-full">{error}</p>}
      <InvoiceTable
        invoiceItems={invoiceItems}
        setInvoiceItems={setInvoiceItems}
      />
      <hr className="w-10/12 mx-auto my-6" />
      <InvoiceTotal total={total} />
      <div className="w-full flex justify-center my-8">
        <button className="bg-blue-500 hover:bg-blue-600 p-2 h-10 rounded-tr rounded cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block mr-2 align-middle"
          >
            <rect
              x="3"
              y="6"
              width="18"
              height="12"
              rx="2"
              fill="#fff"
              stroke="#2563eb"
              strokeWidth="2"
            />
            <polyline
              points="3,6 12,13 21,6"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
            />
          </svg>
          <span>Générer la facture</span>
        </button>
      </div>
    </div>
  );
}
