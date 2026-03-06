import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, CheckCircle, GraduationCap } from "lucide-react";
import "animate.css";

import useJob from "../../hooks/useJob";
import { useIndustry, useSiteStatistics } from "../../hooks/useUniversal";
import SearchModalForm from "./components/SearchModalForm";
import Counter from "../../components/Counter";

export default function HeroSection() {
  const { data: stats } = useSiteStatistics();

  const {
    jobs,
    loading,
    loadMore,
    hasMore,
    searchTerm,
    setSearchTerm,
    selectedIndustry,
    setSelectedIndustry,
    loadingMore,
  } = useJob();

  const { data: industries } = useIndustry();

  const [showModal, setShowModal] = useState(false);
  const modalBodyRef = useRef(null);

  /**
   * 🔥 Instead of filtering again, we use the ALREADY FILTERED jobs from useJob()
   * When Search is clicked → open modal and show the filtered jobs
   */
  const handleSearch = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleScroll = () => {
    const el = modalBodyRef.current;
    if (!el || loadingMore || !hasMore) return;

    const bottomReached =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 50;

    if (bottomReached) {
      loadMore();
    }
  };

  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 300);

    return () => clearTimeout(timeout);
  }, [localSearch]);

  return (
    <section className="bg-gray-50 py-16 lg:py-0">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
        {/* LEFT CONTENT */}
        <div>
          {/* Heading */}
          <h1 className="animate__animated animate__fadeInDown text-4xl lg:text-5xl font-bold text-Blue leading-tight">
            A Place Where <span className="text-Orange">Employers</span> Meet
            Potential Candidates
          </h1>

          {/* Subtitle */}
          <p className="animate__animated animate__fadeInLeft mt-6 text-lg text-gray-600">
            Set your career in motion with Ekazi. Discover opportunities,
            connect with employers, and build your future.
          </p>

          {/* Search */}
          <div className="mt-8 flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="What are you looking for..."
              className="px-2 py-2 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-Orange"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />

            <select
              className="px-2 py-2 truncate rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-Orange"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option>Select Category</option>
              {industries?.length > 0 &&
                industries.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.industry_name}
                  </option>
                ))}
            </select>

            <button
              type="button"
              onClick={handleSearch}
              className="bg-Orange hover:bg-orange-600 text-white px-8 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="text-center">
              <BriefcaseBusiness
                className="mx-auto text-Orange mb-2"
                size={28}
              />
              <p className="text-2xl lg:text-3xl font-bold text-Blue m-0">
                <Counter end={stats?.employers ?? 0} />
              </p>
              <p className="text-base text-gray-500">Employers</p>
            </div>

            <div className="text-center">
              <GraduationCap className="mx-auto text-Orange mb-2" size={30} />
              <p className="text-2xl lg:text-3xl font-bold text-Blue m-0">
                <Counter end={stats?.job_seekers ?? 0} />
              </p>
              <p className="text-base text-gray-500">Job Seekers</p>
            </div>

            <div className="text-center">
              <CheckCircle className="mx-auto text-Orange mb-2" size={28} />
              <p className="text-2xl lg:text-3xl font-bold text-Blue m-0">
                <Counter end={stats?.job_posts ?? 0} />
              </p>
              <p className="text-base text-gray-500">Job Posts</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex justify-center lg:justify-end">
          <img
            src="/images/hero-1.png"
            alt="Professional woman"
            className="w-[380px] lg:w-[400px] object-contain"
          />
        </div>
      </div>

      <SearchModalForm
        showModal={showModal}
        handleClose={handleClose}
        modalBodyRef={modalBodyRef}
        handleScroll={handleScroll}
        filteredJobs={jobs} // Jobs are ALREADY filtered by useJob hook
        loadingMore={loadingMore}
        hasMore={hasMore}
        loading={loading}
      />
    </section>
  );
}
