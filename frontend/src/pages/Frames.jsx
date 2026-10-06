import { useEffect, useState } from "react";
import { getFrames } from "../api/frames";
import FrameCard from "../components/FrameCard";
import CategoryFilter from "../components/CategoryFilter";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

export default function Frames() {
  const [frames, setFrames] = useState([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async (category) => {
    try {
      setLoading(true);
      setError(false);
      const res = await getFrames(category);
      setFrames(res.data.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load("All");
  }, []);

  const categories = [...new Set(frames.map((f) => f.category))];

  const handleFilter = (cat) => {
    setActive(cat);
    load(cat);
  };

  return (
    <div className="pt-32 pb-20 section-wrapper !py-0">
      <div className="text-center mb-10">
        <span className="text-gold text-xs tracking-[0.3em] mb-3 block">KEEPSAKES</span>
        <h1 className="section-heading">Photo Frames</h1>
        <p className="text-ivory/50 mt-4 max-w-xl mx-auto">
          Handcrafted frames to preserve your favourite memories in timeless style.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-12">
          <CategoryFilter categories={categories} active={active} onChange={handleFilter} />
        </div>
      )}

      {loading ? (
        <Loader label="Loading frames" />
      ) : error ? (
        <ErrorState message="Could not load photo frames." onRetry={() => load(active)} />
      ) : frames.length === 0 ? (
        <EmptyState title="No frames available yet" subtitle="Our frame collection is being curated." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {frames.map((f) => (
            <FrameCard key={f._id} frame={f} />
          ))}
        </div>
      )}
    </div>
  );
}
