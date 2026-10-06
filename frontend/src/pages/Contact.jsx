import { useStudio } from "../context/StudioContext";
import EnquiryForm from "../components/EnquiryForm";

export default function Contact() {
  const { studio } = useStudio();

  return (
    <div className="pt-32 pb-20 section-wrapper !py-0">
      <div className="text-center mb-14">
        <span className="text-gold text-xs tracking-[0.3em] mb-3 block">GET IN TOUCH</span>
        <h1 className="section-heading">Contact Us</h1>
        <p className="text-ivory/50 mt-4 max-w-xl mx-auto">
          Have an event in mind? Send us the details and we'll take it from there.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-gold text-xs tracking-widest mb-2">PHONE</h3>
            <p className="text-ivory/80">{studio?.phone || "Available soon"}</p>
          </div>
          <div>
            <h3 className="text-gold text-xs tracking-widest mb-2">WHATSAPP</h3>
            <p className="text-ivory/80">{studio?.whatsapp || "Available soon"}</p>
          </div>
          <div>
            <h3 className="text-gold text-xs tracking-widest mb-2">EMAIL</h3>
            <p className="text-ivory/80">{studio?.email || "Available soon"}</p>
          </div>
          <div>
            <h3 className="text-gold text-xs tracking-widest mb-2">STUDIO ADDRESS</h3>
            <p className="text-ivory/80">{studio?.address || "Available soon"}</p>
          </div>

          {studio?.mapEmbedUrl && (
            <div className="rounded-md overflow-hidden border border-white/10 mt-2">
              <iframe
                src={studio.mapEmbedUrl}
                title="Studio location"
                className="w-full h-64 border-0"
                loading="lazy"
              />
            </div>
          )}
        </div>

        <div>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
