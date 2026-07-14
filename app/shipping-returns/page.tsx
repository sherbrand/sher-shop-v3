import type { Metadata } from "next";
import { ProsePage } from "@/components/ProsePage";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "How SHER ships worldwide from Thailand, what delivery takes, how customs and duties work, and how to exchange an order.",
};

export default function ShippingReturnsPage(): React.ReactElement {
  return (
    <ProsePage
      title="Shipping & Returns"
      subtitle="How long your order takes, how customs work, and how to send something back."
      sections={[
        {
          h2: "Where Do You Ship?",
          body: "We ship worldwide. Every order goes out from SHER's warehouse in Thailand.",
        },
        {
          h2: "When Will I Receive My Order?",
          body: "First we process your order, which takes 2 to 3 business days. Then we hand it to the carrier and email you to confirm. Standard shipping takes 7 to 14 business days. Express shipping takes 3 to 5 business days.",
        },
        {
          h2: "About Customs & Duties",
          body: "Import duties may apply when your order arrives. The amount depends on your country's rules, and local customs set the fee. Please check your country's import rules first, so the charge is no surprise. If you reject the package and will not pay the fee, we cannot refund the order.",
        },
        {
          h2: "Returns & Exchanges",
          body: "We accept exchanges. To start one, email us at hello@sherbrand.co with your order number in the subject line. Then mail the item to 456/49 Moo 10, T.Bangpla, A.Bangplee, Samutprakarn 10540.",
        },
      ]}
    />
  );
}
