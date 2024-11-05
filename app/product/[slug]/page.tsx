import { Suspense } from "react";

import { DynamicProduct, DynamicProductSkeleton } from "./dynamic-product";
import { products } from "@/lib/products";
import RelatedProducts, {
  RelatedProductsSkeleton,
} from "@/components/related-products";

export const experimental_ppr = true;

export const generateStaticParams = () => {
  // SSG all products except hoodie
  return products
    .filter((product) => product.slug !== "hoodie")
    .map((product) => {
      return {
        slug: product.slug,
      };
    });
};

export default function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="max-w-5xl mx-auto py-6 px-4 md:px-6">
      <section className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start py-4 md:py-8 lg:py-12">
        <Suspense fallback={<DynamicProductSkeleton />}>
          <DynamicProduct params={props.params} />
        </Suspense>
      </section>
      <Suspense fallback={<RelatedProductsSkeleton />}>
        <RelatedProducts params={props.params} />
      </Suspense>
    </main>
  );
}
