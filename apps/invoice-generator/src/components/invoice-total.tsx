interface Props {
  total: number;
}

export default function InvoiceTotal({ total }: Props) {
  return (
    <table className="w-10/12 table-fixed text-black mx-auto">
    <thead>
      <tr>
        <th className="w-10/12 text-left">Notes</th>
        <th className="w-2/12 text-right">Total TTC</th>
      </tr>
    </thead>
    <tbody>

        
      <tr>
        <td className="w-10/12 text-xs">
          {" "}
          HT
        </td>
        <td className="w-2/12 text-right">{total}€</td>
      </tr>
      <tr>
        <td className="w-10/12 text-xs">
          {" "}
          TVA
        </td>
        <td className="w-2/12 text-right">20%</td>
      </tr>
      <tr>
        <td className="w-10/12 text-xs">
          {" "}
          Nous acceptions le paiement par virement bancaire{" "}
        </td>
        <td className="w-2/12 text-right text-2xl">{total + total * 0.2}€</td>
      </tr>
    </tbody>
  </table>
  );
}