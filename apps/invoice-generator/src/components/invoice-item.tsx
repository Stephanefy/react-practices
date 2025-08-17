import type { InvoiceItemInterface } from "./invoice-item-form";

interface Props {
  invoiceItem: InvoiceItemInterface;
  onDelete: () => void;
}

export default function InvoiceItem({ invoiceItem, onDelete }: Props) {
  return (
    <tr className="h-10 min-h-10">
    <td className="w-5/12 p-0 text-left align-middle">
      <div className="h-10 flex items-center mx-2 truncate font-semibold text-1xl">
        {invoiceItem.name}
      </div>
    </td>
    <td className="w-5/12 p-0 text-left align-middle">
      <div className="h-10 flex items-center mx-4">
        <button className="px-2 h-8 italic hover:font-bold rounded-tr rounded-br text-sm cursor-pointer" onClick={onDelete}>
          effacer
        </button>
      </div>
    </td>
    <td className="w-2/12 p-0 align-middle">
      <div className="h-10 flex items-center justify-end text-1xl">
        {invoiceItem.value}€
      </div>
    </td>
  </tr>
  );
}
