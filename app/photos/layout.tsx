import FadeIn from "@/components/fade-in";
import PageTransition from "@/components/page-transition";

export default async function PhotosLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <PageTransition>
      <div className="space-y-16">
        <FadeIn>
          <div className="text-center space-y-4">
            <h1 className="section-title">拾光集</h1>
            <p className="section-subtitle italic">「快门声里的晨昏」</p>
          </div>
        </FadeIn>

        <FadeIn>
          {children}
        </FadeIn>

        {modal}
      </div>
    </PageTransition>
  )
}
