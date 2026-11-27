import { OboloDetail, OboloHeader } from "@/components/apps/obolo-detail";
import { Footer } from "@/components/layout/footer";
import { dictionary } from "@/lib/dictionaries/en";
import { oboloMetadata } from "@/lib/metadata";

export const metadata = oboloMetadata();

export default function Page() {
  return (
    <>
      <OboloHeader dict={dictionary} />
      <main><OboloDetail dict={dictionary} /></main>
      <Footer locale="en" dict={dictionary} note={dictionary.footer.copyright} showLanguages={false} />
    </>
  );
}
