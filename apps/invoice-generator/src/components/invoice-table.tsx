import InvoiceItem from "./invoice-item";
import type { InvoiceItemInterface } from "./invoice-item-form";

interface Props {
  invoiceItems: InvoiceItemInterface[];
  setInvoiceItems: (invoiceItems: InvoiceItemInterface[]) => void;
}

const oneDelete = (
  invoiceItem: InvoiceItemInterface,
  invoiceItems: InvoiceItemInterface[],
  setInvoiceItems: (invoiceItems: InvoiceItemInterface[]) => void
) => {
  const newInvoiceItems = invoiceItems.filter(
    (item) => item.id !== invoiceItem.id
  );
  setInvoiceItems(newInvoiceItems);
};

export const InvoiceTable = ({ invoiceItems, setInvoiceItems }: Props) => {
  return (
    <div className="w-10/12 mx-auto h-52 overflow-y-auto bg-slate-200">
      <table className="w-full table-fixed text-black ">
        <thead className="sticky top-0 bg-slate-200 z-10 h-20">
          <tr>
            <th className="w-5/12 text-left">Service</th>
            <th className="w-5/12 text-right"></th>
            <th className="w-2/12 text-right">Prix HT</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((invoiceItem) => (
            <InvoiceItem
              key={invoiceItem.id}
              invoiceItem={invoiceItem}
              onDelete={() => oneDelete(invoiceItem, invoiceItems, setInvoiceItems)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
